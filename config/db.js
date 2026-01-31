const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // MARCA DE CONTROL: Si ves esto, el código es el NUEVO
    console.log("🔍 Intentando conectar con MONGO_URI...");

    const dbUrl = process.env.MONGO_URI;

    if (!dbUrl) {
      throw new Error("La variable MONGO_URI no está definida en Render.");
    }

    const conn = await mongoose.connect(dbUrl);
    
    console.log(`✅ MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    // Si sigue saliendo 127.0.0.1 aquí, es que algo muy raro pasa con el entorno
    console.error(`❌ ERROR DE CONEXIÓN REAL: ${error.message}`);
    process.exit(1); 
  }
};

module.exports = connectDB;