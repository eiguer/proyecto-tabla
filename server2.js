const express = require('express');
const mysql = require('mysql2/promise');
const compression = require('compression');

const app = express();

const PORT = process.env.PORT || 3001;

async function obtenerDatosDeTabla() {
  // Código para obtener los datos de la tabla, igual que antes...
}

app.use(express.json()); // Middleware para parsear el body de la solicitud como JSON
app.use(compression());

// Ruta para obtener los datos de la tabla
app.get('/api/data', async (req, res) => {
  const { estructura, datos } = await obtenerDatosDeTabla();
  res.json({ estructura, datos });
});

// Ruta para subir cambios a la base de datos
app.put('/api/cambios', async (req, res) => {
  const { id, campo, nuevoValor } = req.body; // Supongamos que los cambios se envían como JSON { id: idRegistro, campo: nombreCampo, nuevoValor: valorNuevo }
  
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'federico',
      password: 'Federico1',
      database: 'nextjs'
    });

    // Supongamos que la tabla se llama 'datos' y el campo a modificar se llama 'campo1'
    await connection.execute('UPDATE contactos SET ?? = ? WHERE id = ?', [campo, nuevoValor, id]);
    
    connection.end(); // Cierra la conexión a la base de datos

    res.json({ message: 'Cambios subidos correctamente' });
  } catch (error) {
    console.error('Error al subir cambios:', error);
    res.status(500).json({ error: 'Error al subir cambios' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor Express funcionando en http://localhost:${PORT}`);
});
