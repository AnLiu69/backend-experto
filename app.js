require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(bodyParser.json());

const diagnosticoRoutes = require('./routers/diagnostico');
app.use('/diagnostico', diagnosticoRoutes);

if(process.env.NODE_ENV == 'desarrollo'){
    app.use(express.static(path.join(__dirname, '../frontend')));

    app.get('/', (req, res) =>{
        res.sendFile(path.join(__dirname, '../frontend/index.html'));
    })
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});