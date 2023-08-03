const express = require('express');
const mysql = require('mysql2/promise'); // Utilizamos la versión promise de mysql2

const app = express();

const PORT = process.env.PORT || 3001;

async function obtenerDatosDeTabla() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'federico',
    password: 'Federico1',
    database: 'nextjs'
  });

  const [columns,] = await connection.execute('DESCRIBE districto');
  const [data,] = await connection.execute('SELECT * FROM districto');

  const estructura = columns.map(col => col.Field);
  const datos = data.map(row => {
    const fila = {};
    estructura.forEach(col => {
      fila[col] = row[col];
    });
    return fila;
  });

  return { estructura, datos };
}

app.get('/api/data', async (req, res) => {
  const { estructura, datos } = await obtenerDatosDeTabla();
  res.json({ estructura, datos });
});

app.listen(PORT, () => {
  console.log(`Servidor Express funcionando en http://localhost:${PORT}`);
});
