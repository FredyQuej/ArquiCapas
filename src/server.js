const express = require('express');
require('dotenv').config();
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Saludo
app.get('/', (_req, res) => {
  res.send('API CRUD con PostgreSQL está funcionando!');
});

// Rutas
app.use('/api', productRoutes);

// Puerto (el contenedor usa 3000; afuera se mapea con ${PORT})
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
