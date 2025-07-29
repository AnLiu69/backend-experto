const { spawn } = require('child_process');
const db = require('../db/conexion');
const { isNumber } = require('util');
const path = require('path')

exports.procesarDiagnostico = (req, res) => {
    const sintomasSinPrefijo = req.body.sintomas; // ['1', '2']
    const sintomas = sintomasSinPrefijo.map(id => `s${id}`); // ["s1", "s7", "s12"]
    const id_usuario = 1; // por ahora fijo

    // Crear cadena en Prolog
    const consulta = `test([${sintomas.join(',')}]).\n`;

    console.log('Ruta completa a experto.pl:', path.join(__dirname, '..', 'experto.pl'));

    const prolog = spawn('swipl', ['-s', path.join(__dirname, '..', 'experto.pl')]);
    let resultado = '';

    prolog.stdin.write(consulta);
    prolog.stdin.end();

    prolog.stdout.on('data', (data) => {
        resultado += data.toString();
    });

    prolog.stderr.on('data', (data) => {
        console.error(`Error Prolog: ${data}`);
    });

    prolog.on('close', async (code) => {
        // resultado será el texto que write/1 generó
        const diagnostico = resultado.trim().split('\n')[0]; // Primera línea: nombre(s) enfermedad(es)
        console.log("Consulta a Prolog:", consulta); // 👈 agrega esto

        if (diagnostico.toLowerCase() === 'false' || diagnostico.includes('No se detectaron enfermedades')) {
            return res.json({ diagnostico: 'Sin resultado válido. Por favor revise los síntomas seleccionados.' });
        }

        try {
            const [rows] = await db.query('INSERT INTO diagnosticos (id_usuario, resultado) VALUES (?, ?)', [id_usuario, diagnostico]);

            const id_diagnostico = rows.insertId;

            for (const id_sintoma of sintomasSinPrefijo) {
                await db.query(
                    'INSERT INTO diagnostico_sintomas (id_diagnostico, id_sintoma) VALUES (?, ?)',
                    [id_diagnostico, id_sintoma]
                );
            }

            res.json({ diagnostico });
        } catch (err) {
            console.error('Error al insertar diagnóstico o síntomas:', err);
            return res.status(500).json({ error: 'Error al guardar diagnóstico' })
        }
    });
};

exports.obtenerHistorial = async (req, res) => {
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

    try {
        const [results] = await db.query(queryDiagnosticos, [id_usuario]);
        // Transformar resultados
        const evaluaciones = results.map(row => ({
            id: row.id,
            diagnosis: row.diagnosis,
            date: row.date,
            symptoms: row.sintomas.split(',').map(s => s.trim())
        }));
        res.json(evaluaciones);
    }
    catch (err) {
        console.error("Error al consultar historial:", err);
        return res.status(500).json({ error: 'Error al obtener el historial' });
    }
};

exports.listarPacientes = async (req, res) => {
    const query = `SELECT id, nombre, correo FROM usuarios WHERE tipo = 'paciente'`;

    try {
        const [results] = await db.query(query);
        res.json(results);
    } catch (err) {
        console.error('Error al obtener pacientes:', err);
        return res.status(500).json({ error: 'Error al obtener pacientes' });
    }
};

exports.agregarPaciente = async (req, res) => {
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

    try {
        const [result] = await db.query(query, [nuevoPaciente.nombre, nuevoPaciente.correo, nuevoPaciente.tipo]);
        res.status(201).json({ message: 'Paciente registrado correctamente', id: result.insertId });

    } catch (err) {
        console.error('Error al insertar paciente:', err);
        return res.status(500).json({ error: 'Error al registrar el paciente' });
    }
};


exports.obtenerSintomas = async (req, res) => {
    const sql = 'SELECT * FROM sintomas';

    try {
        const [results] = await db.query(sql);
        res.json(results);
    } catch (err) {

        console.error('Error al obtener síntomas:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};


// Crear nuevo síntoma
exports.crearSintoma = async (req, res) => {
    const { nombre } = req.body;

    if (!nombre || nombre.trim().length < 2) {
        return res.status(400).json({ error: 'Nombre inválido' });
    }

    const sql = 'INSERT INTO sintomas (nombre) VALUES (?)';

    try {
        const [rows] = await db.query(sql, [nombre.trim()]);
        res.status(201).json({ message: 'Síntoma creado correctamente', id: rows.insertId });

    } catch (err) {
        console.error('Error al insertar síntoma:', err);
        return res.status(500).json({ error: 'No se pudo guardar el síntoma' });
    }
};

// ⚠️ Esta operación borra el síntoma de forma permanente.
// Asegúrate de no eliminar síntomas usados por el sistema experto (Prolog).
exports.eliminarSintoma = async (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM sintomas WHERE id = ?';

    try {
        const [rows] = await db.query(sql, [id]);

        if (rows.affectedRows === 0) {
            return res.status(404).json({ error: 'Síntoma no encontrado' });
        }

        res.json({ message: 'Síntoma eliminado correctamente' });
    } catch (err) {
        console.error('Error al eliminar síntoma:', err);
        return res.status(500).json({ error: 'No se pudo eliminar el síntoma' });
    }
};