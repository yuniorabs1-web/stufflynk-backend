const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Forzamos a que use solo la variable de entorno de la nube
    const dbUrl = process.env.MONGO_URI;

    if (!dbUrl) {
      throw new Error("La variable MONGO_URI no está llegando al código. Revisa el panel de Render.");
    }

    const conn = await mongoose.connect(dbUrl);
    
    console.log(`✅ MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error de conexión a MongoDB: ${error.message}`);
    process.exit(1); 
  }
};

module.exports = connectDB;