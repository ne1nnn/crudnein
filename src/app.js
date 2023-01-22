const express = require('express');
const mysql = require('mysql')
const path = require('path');
const morgan = require('morgan');
const myConnection = require('express-myconnection');

const app = express();

// Importacion de rutas
const customerRoutes = require('./routes/customer');

// Setting ***Estudiar concepto( variable de entorno)

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');  // sirve para renderizar el frontend
app.set('views', path.join(__dirname, 'views'));

//middlewares (funciones que se ejecutan antes de las peticiones de los user)
app.use(morgan('dev'));

app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'crudnodejsmysql'
}, 'single'));

app.use(express.urlencoded({extended: false}));

//routes -- son las rutas del servidor express, exportando la var antes declarada
app.use('/', customerRoutes);

// static files
app.use(express.static(path.join(__dirname, 'views')));

//
app.listen(app.get('port'), () =>{
    console.log('Server on port ', app.get('port'));
});
