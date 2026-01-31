require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./config/swagger");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

// 🛡️ MIDDLEWARES DE SEGURIDAD Y CONFIGURACIÓN
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🏠 RUTA DE INICIO
app.get("/", (req, res) => res.send("Stufflynk API Running..."));

// 📝 DOCUMENTACIÓN SWAGGER
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpecs));

// 🛣️ RUTAS DE LA API
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// ⚠️ MANEJO DE ERRORES
app.use(notFound);
app.use(errorHandler);

module.exports = app;