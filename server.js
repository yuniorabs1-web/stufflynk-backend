const app = require("./app");
const connectDB = require("./config/db");

// Conexión a la base de datos
connectDB();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    console.log(`📝 Documentación lista en: /api-docs`);
});

// Manejo de errores de proceso (Nivel Senior)
process.on("unhandledRejection", (err) => {
    console.log(`Error crítico: ${err.message}`);
    server.close(() => process.exit(1));
});