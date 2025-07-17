const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3000;

// Middleware para recibir datos de formularios
app.use(express.urlencoded({ extended: true }));

// Hacer accesible todo lo que está en /public (css, imágenes, index.html, etc)
app.use(express.static(path.join(__dirname, 'public')));

// Conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'alumno',          // Cambiá si tenés otro usuario
  password: 'alumnoipm',          // Si usás contraseña, ponela acá
  database: 'spotiMy'    // La base de datos que ya importaste
});

db.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar a la base de datos:', err);
    return;
  }
  console.log('✅ Conectado a la base de datos');
});

// Ruta para mostrar el formulario
app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, 'form.html'));
});

// Ruta para guardar los datos del formulario
app.post('/guardar', (req, res) => {
  const { nombreUsuario, email, tipo, nombreTipo, descripcionTipo } = req.body;

  const sql = 'INSERT INTO opiniones (nombreUsuario, email, tipo, nombreTipo, descripcionTipo) VALUES (?, ?, ?, ?, ?)';
  const valores = [nombreUsuario, email, tipo, nombreTipo, descripcionTipo];

  db.query(sql, valores, (err, result) => {
    if (err) {
      console.error('❌ Error al insertar los datos:', err);
      return res.send('Hubo un error al guardar los datos.');
    }
    console.log('📥 Opinión guardada correctamente');
    res.send('<h2>¡Gracias por tu opinión!</h2><a href="/">Volver al inicio</a>');
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor funcionando en http://localhost:${port}`);
});
