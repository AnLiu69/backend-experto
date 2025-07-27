const { spawn } = require('child_process');
const db = require('../db/conexion');

exports.procesarDiagnostico = (req, res) => {
    const sintomasSinPrefijo = req.body.sintomas; // ['1', '2']
    const sintomas = sintomasSinPrefijo.map(id => `s${id}`); // ["s1", "s7", "s12"]
    const id_usuario = 1; // por ahora fijo

    // Crear cadena en Prolog
    const consulta = `test([${sintomas.join(',')}]).\n`;

    const prolog = spawn('swipl', ['-s', 'experto.pl']);
    let resultado = '';

    prolog.stdin.write(consulta);
    prolog.stdin.end();

    prolog.stdout.on('data', (data) => {
        resultado += data.toString();
    });

    prolog.stderr.on('data', (data) => {
        console.error(`Error Prolog: ${data}`);
    });

    prolog.on('close', (code) => {
        // resultado será el texto que write/1 generó
        const diagnostico = resultado.trim().split('\n')[0]; // Primera línea: nombre(s) enfermedad(es)
        console.log("Consulta a Prolog:", consulta); // 👈 agrega esto

        if (diagnostico.toLowerCase() === 'false' || diagnostico.includes('No se detectaron enfermedades')) {
            return res.json({ diagnostico: 'Sin resultado válido. Por favor revise los síntomas seleccionados.' });
        }

        // Insertar en la base de datos
        db.query('INSERT INTO diagnosticos (id_usuario, resultado) VALUES (?, ?)', [id_usuario, diagnostico], (err, result) => {
            if (err) throw err;

            const id_diagnostico = result.insertId;

            // Guardar relación de síntomas seleccionados
            sintomasSinPrefijo.forEach(id_sintoma => {
                db.query('INSERT INTO diagnostico_sintomas (id_diagnostico, id_sintoma) VALUES (?, ?)', [id_diagnostico, id_sintoma]);
            });

            res.json({ diagnostico });
        });
    });
};

exports.obtenerHistorial = (req, res) => {
    const id_usuario = 1; // ← De momento fijo

    const queryDiagnosticos = `
        SELECT d.id, d.resultado AS diagnosis, d.fecha AS date, GROUP_CONCAT(s.nombre SEPARATOR ',') AS sintomas
        FROM diagnosticos d
        JOIN diagnostico_sintomas ds ON d.id = ds.id_diagnostico
        JOIN sintomas s ON s.id = ds.id_sintoma
        WHERE d.id_usuario = ?
        GROUP BY d.id
        ORDER BY d.fecha DESC
    `;

    db.query(queryDiagnosticos, [id_usuario], (err, results) => {
        if (err) {
            console.error("Error al consultar historial:", err);
            return res.status(500).json({ error: 'Error al obtener el historial' });
        }

        // Transformar resultados
        const evaluaciones = results.map(row => ({
            id: row.id,
            diagnosis: row.diagnosis,
            date: row.date,
            symptoms: row.sintomas.split(',').map(s => s.trim())
        }));

        res.json(evaluaciones);
    });
};

exports.listarPacientes = (req, res) => {
    const query = `SELECT id, nombre, correo FROM usuarios WHERE tipo = 'paciente'`;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener pacientes:', err);
            return res.status(500).json({ error: 'Error al obtener pacientes' });
        }

        res.json(results);
    });
};

exports.agregarPaciente = (req, res) => {
    const { nombre, correo } = req.body;

    if (!nombre || !correo) {
        return res.status(400).json({ error: 'Nombre y correo son obligatorios' });
    }

    const nuevoPaciente = {
        nombre,
        correo,
        tipo: 'paciente'
    };

    const query = 'INSERT INTO usuarios (nombre, correo, tipo) VALUES (?, ?, ?)';

    db.query(query, [nuevoPaciente.nombre, nuevoPaciente.correo, nuevoPaciente.tipo], (err, result) => {
        if (err) {
            console.error('Error al insertar paciente:', err);
            return res.status(500).json({ error: 'Error al registrar el paciente' });
        }

        res.status(201).json({ message: 'Paciente registrado correctamente', id: result.insertId });
    });
};


exports.obtenerSintomas = (req, res) => {
    const sql = 'SELECT * FROM sintomas';

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener síntomas:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        res.json(results);
    });
};


// Crear nuevo síntoma
exports.crearSintoma = (req, res) => {
    const { nombre } = req.body;

    if (!nombre || nombre.trim().length < 2) {
        return res.status(400).json({ error: 'Nombre inválido' });
    }

    const sql = 'INSERT INTO sintomas (nombre) VALUES (?)';
    db.query(sql, [nombre.trim()], (err, result) => {
        if (err) {
            console.error('Error al insertar síntoma:', err);
            return res.status(500).json({ error: 'No se pudo guardar el síntoma' });
        }

        res.status(201).json({ message: 'Síntoma creado correctamente', id: result.insertId });
    });
};

// ⚠️ Esta operación borra el síntoma de forma permanente.
// Asegúrate de no eliminar síntomas usados por el sistema experto (Prolog).
exports.eliminarSintoma = (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM sintomas WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar síntoma:', err);
            return res.status(500).json({ error: 'No se pudo eliminar el síntoma' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Síntoma no encontrado' });
        }

        res.json({ message: 'Síntoma eliminado correctamente' });
    });
};