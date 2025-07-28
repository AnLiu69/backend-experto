const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

conexion.connect((err) => {
    if (err) throw err;
    console.log('Conexión a BD exitosa');
});

module.exports = conexion;