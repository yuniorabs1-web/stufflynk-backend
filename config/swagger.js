const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: { 
      title: "Stufflynk API", 
      version: "1.0.0",
      description: "Documentación oficial de Stufflynk" 
    },
    servers: [
      { url: "https://stufflynk-backend.onrender.com" },
      { url: "http://localhost:5000" },
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

module.exports = swaggerJsDoc(swaggerOptions);