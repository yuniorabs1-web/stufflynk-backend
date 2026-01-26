const express = require("express");
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  getUsers, 
  getUserById 
} = require("../controllers/userController");

// @desc    Registrar nuevo usuario
// @route   POST /api/users
router.post("/", registerUser);

// @desc    Autenticar usuario y obtener token
// @route   POST /api/users/login
router.post("/login", loginUser);

// @desc    Obtener todos los usuarios
// @route   GET /api/users
router.get("/", getUsers);

// @desc    Obtener usuario por ID
// @route   GET /api/users/:id
router.get("/:id", getUserById);

module.exports = router;