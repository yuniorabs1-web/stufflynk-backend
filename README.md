# Stufflynk Backend 🚀 | API Engine & Ecosystem

**Plataforma de alto rendimiento para la gestión integral de productos, servicios y transacciones comerciales.**

Este repositorio contiene el núcleo operativo de **Stufflynk**, diseñado bajo estándares de **Clean Architecture** y **Separación de Responsabilidades (SoC)**. El sistema está optimizado para escalabilidad, seguridad y una integración fluida con su ecosistema de Frontend.

---

## 🏗️ Arquitectura del Sistema
El proyecto se divide en dos capas principales para garantizar la estabilidad:
* **Core API (Backend):** Arquitectura robusta basada en Node.js y Express, con una gestión de errores centralizada y seguridad perimetral.
* **Client (Frontend):** Interfaz reactiva moderna integrada dentro del directorio raíz para un despliegue cohesivo.

---

## 🛠️ Stack Tecnológico
* **Runtime:** Node.js (v18+)
* **Framework:** Express.js (Arquitectura Modular)
* **Base de Datos:** MongoDB Atlas (Capa de persistencia NoSQL)
* **Modelado:** Mongoose (Validación de esquemas y middleware)
* **Seguridad:** JWT (Stateless Auth) & Bcryptjs (Hashing de alto nivel)
* **Cloud:** Integración con Cloudinary para gestión de activos multimedia.
* **Documentación:** Swagger UI (OpenAPI 3.0 Standard).

---

## 📂 Estructura Jerárquica del Proyecto
La organización de archivos sigue el estándar de la industria para facilitar el mantenimiento y la auditoría de código:

```text
STUFFLYNK/
├── auth/                       # Lógica de seguridad y gestión de tokens
├── config/                     # Configuraciones (Cloudinary, DB, Swagger)
├── controllers/                # Controladores (Lógica de negocio procesada)
├── middleware/                 # Validaciones, roles y gestión de excepciones
├── models/                     # Esquemas de datos y persistencia (Mongoose)
├── routes/                     # Definición de Endpoints y rutas API
├── stufflynk-frontend/         # Ecosistema del Cliente (Vite + React)
│   ├── src/                    # Código fuente del Frontend
│   └── vite.config.js          # Configuración de compilación moderna
├── .env                        # Variables de entorno (Sensible/Protegido)
├── .gitignore                  # Reglas de exclusión de Git (Seguridad)
├── app.js                      # Inicialización de Middlewares y Express
├── server.js                   # Punto de entrada y arranque del sistema
├── swagger.json                # Especificación técnica de la API
└── package.json                # Gestión de dependencias y scripts