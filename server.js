import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';

dotenv.config();

const app = express();

// Middleware de seguridad
app.use(helmet());
app.use(mongoSanitize());
app.use(cors());
app.use(express.json());

// Conexión a Base de Datos
const connectDB = async () => {
    try {
        console.log('🔍 Intentando conectar con MONGO_URI...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Conectado');
    } catch (err) {
        console.error('❌ Error de conexión:', err.message);
        process.exit(1);
    }
};

connectDB();

// Rutas base
app.get('/', (req, res) => res.send('API de StuffLynk funcionando 🚀'));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    console.log(`📝 Documentación lista en: http://localhost:${PORT}/api-docs`);
});