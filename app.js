const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();
const port = 3000;

// Middleware para recibir datos del formulario
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (CSS, imágenes, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal para mostrar el formulario
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'form.html'));
});

// Conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',        // Cambiá si usás otro usuario
  password: '',        // Poné tu contraseña si tenés
  database: 'spotiMy'  // Base de datos que ya tenés
});

db.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar a la base de datos:', err);
    return;
  }
  console.log('✅ Conectado a la base de datos');
});

// Ruta para recibir los datos del formulario
app.post('/guardar', (req, res) => {
  const { nombreUsuario, email, tipo, nombreTipo, descripcionTipo } = req.body;

  const sql = 'INSERT INTO opiniones (nombreUsuario, email, tipo, nombreTipo, descripcionTipo) VALUES (?, ?, ?, ?, ?)';
  const valores = [nombreUsuario, email, tipo, nombreTipo, descripcionTipo];

  db.query(sql, valores, (err, result) => {
    if (err) {
      console.erro
