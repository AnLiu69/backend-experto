require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const corsOptions = {
    origin: 'https://frontend-experto.netlify.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
};


app.use(cors(corsOptions));
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