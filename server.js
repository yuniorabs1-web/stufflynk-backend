const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');

dotenv.config();

const app = express();

// --- Middlewares Profesionales ---
app.use(helmet());
app.use(mongoSanitize());
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true
}));
app.use(express.json());

// --- Conexión a Base de Datos ---
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Conectado');
    } catch (err) {
        console.error('❌ Error de conexión:', err.message);
    }
};
connectDB();

// --- Rutas ---
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/deals', require('./routes/dealRoutes'));

app.get('/', (req, res) => res.send('API de StuffLynk funcionando 🚀'));

// --- Manejo de Errores ---
app.use((err, req, res, next) => {
    const status = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(status).json({
        message: err.message || 'Error interno del servidor'
    });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor estable en puerto ${PORT}`);
});