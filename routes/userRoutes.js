const express = require("express");
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  getUsers, 
  getUserById 
} = require("../controllers/userController");

// ✅ RUTA DE LOGIN (Específica y prioritaria)
router.route("/login").post(loginUser);

// ✅ RUTA DE REGISTRO
router.route("/register").post(registerUser);

// ✅ RUTA GENERAL
router.route("/").get(getUsers);

// ✅ RUTA POR ID (Siempre al final)
// Esta es la que causaba el error de "Cast to ObjectId" al estar arriba
router.route("/:id").get(getUserById);

module.exports = router;