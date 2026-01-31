require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express"); 
const swaggerSpecs = require("./config/swagger"); // <--- Importamos la configuración limpia

const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

// Conexión a la base de datos
connectDB();

const app = express();

// 🛡️ MIDDLEWARES DE SEGURIDAD Y DATOS
app.use(helmet({ contentSecurityPolicy: false })); 
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🏠 RUTA DE INICIO
app.get("/", (req, res) => res.send("Stufflynk API Running..."));

// 📝 DOCUMENTACIÓN (Llamando al archivo externo)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// 🛣️ RUTAS DE LA API
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// ⚠️ MANEJO DE ERRORES
app.use(notFound);
app.use(errorHandler);

// 🚀 ARRANQUE DEL SERVIDOR
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    console.log(`📝 Documentación lista en: http://localhost:${PORT}/api-docs`);
});