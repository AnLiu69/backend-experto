const express = require('express');
const router = express.Router();
const { procesarDiagnostico, obtenerHistorial, listarPacientes, agregarPaciente, obtenerSintomas, crearSintoma, eliminarSintoma} = require('../controllers/diagnosticoController');

// paciente
router.post('/', procesarDiagnostico);
router.get('/historial', obtenerHistorial); 

// medico - pacientes
router.get('/pacientes', listarPacientes);
router.post('/pacientes', agregarPaciente);

// medico - sintomas
router.get('/sintomas', obtenerSintomas);
router.post('/sintomas', crearSintoma);
router.delete('/sintomas/:id', eliminarSintoma);

module.exports = router;