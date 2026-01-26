require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express"); 
const swaggerJsDoc = require("swagger-jsdoc"); 

const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

connectDB();

const app = express();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: { 
      title: "Stufflynk API", 
      version: "1.0.0",
      description: "Documentación oficial de Stufflynk" 
    },
    servers: [
      {
        url: "/", // Esto permite que Swagger funcione tanto en localhost como en la nube
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      },
    },
    paths: {
      "/api/users": {
        post: {
          tags: ["Usuarios"],
          summary: "Registrar un nuevo usuario",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: { type: "string", example: "Admin" },
                    email: { type: "string", example: "admin@example.com" },
                    password: { type: "string", example: "123456" }
                  }
                }
              }
            }
          },
          responses: { 201: { description: "Usuario creado" } }
        }
      },
      "/api/users/login": {
        post: {
          tags: ["Usuarios"],
          summary: "Iniciar sesión",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: { type: "string", example: "admin@example.com" },
                    password: { type: "string", example: "123456" }
                  }
                }
              }
            }
          },
          responses: { 200: { description: "Login exitoso" } }
        }
      },
      "/api/products": {
        get: { tags: ["Productos"], summary: "Listar productos", responses: { 200: { description: "OK" } } },
        post: {
          tags: ["Productos"],
          summary: "Crear producto con imagen",
          security: [{ bearerAuth: [] }],
          requestBody: {
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    description: { type: "string" },
                    price: { type: "number" },
                    category: { type: "string" },
                    stock: { type: "number" },
                    image: { type: "string", format: "binary" }
                  }
                }
              }
            }
          },
          responses: { 201: { description: "Creado" } }
        }
      }
    }
  },
  apis: [], 
};

const swaggerSpecs = swaggerJsDoc(swaggerOptions);

app.use(helmet({ contentSecurityPolicy: false })); 
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.get("/", (req, res) => res.send("Stufflynk API Running..."));
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

// Ajuste para el puerto de Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));