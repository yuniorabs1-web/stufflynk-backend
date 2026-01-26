// He ajustado la ruta al modelo, asegúrate de que el archivo se llame product.js o productModel.js
// Si tu archivo en la carpeta models se llama productModel.js, cambia la línea de abajo a: ../models/productModel
const Product = require("../models/product");

// 1. Crear producto
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    
    // req.file.path contiene la URL de Cloudinary
    const image = req.file ? req.file.path : ""; 

    if (!req.user) {
      return res.status(401).json({ message: "No autorizado" });
    }

    const product = new Product({ 
      name, 
      description, 
      price, 
      category, 
      stock,
      image, // Aquí se guarda la URL: https://res.cloudinary.com/...
      user: req.user._id 
    });

    const saved = await product.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Error al crear", error: error.message });
  }
};

// 2. Listar productos
const listProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al listar", error: error.message });
  }
};

// 3. Obtener por ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "No encontrado" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

// 4. Actualizar
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "No encontrado" });

    if (req.file) product.image = req.file.path;
    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.category = category ?? product.category;
    product.stock = stock ?? product.stock;

    const updated = await product.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar", error: error.message });
  }
};

// 5. Eliminar
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "No encontrado" });
    await product.deleteOne();
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar", error: error.message });
  }
};

module.exports = {
  createProduct,
  listProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};