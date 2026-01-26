const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// 1. Configuramos las llaves EXACTAS que me pasaste
cloudinary.config({
  cloud_name: "deimxkjpv",
  api_key: "344789296951528",
  api_secret: "127u5bktFtqOqyI-tbVKP51KoQA",
});

// 2. Definimos las reglas de almacenamiento
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "stufflynk_uploads", 
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

// 3. Creamos el middleware "upload" que usan tus rutas
const upload = multer({ storage: storage });

module.exports = { cloudinary, upload };