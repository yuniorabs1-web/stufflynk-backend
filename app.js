const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Tus rutas de API irán aquí abajo
// app.use('/api/auth', require('./routes/auth'));

module.exports = app;