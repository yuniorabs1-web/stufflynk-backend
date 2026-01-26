const express = require("express");
const router = express.Router();
const { listProducts, createProduct, getProductById, updateProduct, deleteProduct } = require("../controllers/productController");
const { protect, admin } = require("../auth/authMiddleware");
const { validateProduct } = require("../middleware/validationMiddleware");
const { upload } = require("../config/cloudinary");

// Rutas de Productos
router.route("/")
    .get(listProducts)
    .post(protect, upload.single("image"), validateProduct, createProduct);

router.route("/:id")
    .get(getProductById)
    .put(protect, upload.single("image"), updateProduct)
    .delete(protect, admin, deleteProduct);

module.exports = router;