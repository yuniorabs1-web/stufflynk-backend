const Deal = require("../models/trade"); // ✅ Usamos el modelo de Trade unificado

// Crear un nuevo deal (Transacción)
const createDeal = async (req, res) => {
  try {
    const { title, terms, price, seller, product, service } = req.body;

    // ✅ El buyer es el usuario autenticado (req.user._id)
    const newDeal = new Deal({ 
      title, 
      terms, 
      price, 
      seller, // Dueño del producto/servicio
      buyer: req.user._id, // Usuario que compra
      product: product || null,
      service: service || null
    });

    const savedDeal = await newDeal.save();
    res.status(201).json(savedDeal);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el deal", error: error.message });
  }
};

// Obtener todos los deals (útil para admin o historial)
const getDeals = async (req, res) => {
  try {
    // ✅ .populate() sirve para ver los nombres en lugar de solo IDs
    const deals = await Deal.find()
      .populate("buyer", "name email")
      .populate("seller", "name email")
      .sort({ createdAt: -1 });
    res.json(deals);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los deals", error: error.message });
  }
};

// Obtener un deal por ID
const getDealById = async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id)
      .populate("buyer seller", "name email");
      
    if (!deal) {
      return res.status(404).json({ message: "Deal no encontrado" });
    }
    res.json(deal);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar el deal", error: error.message });
  }
};

// Actualizar un deal (Cambiar estado)
const updateDeal = async (req, res) => {
  try {
    const { title, terms, price, status } = req.body;
    const deal = await Deal.findById(req.params.id);

    if (!deal) {
      return res.status(404).json({ message: "Deal no encontrado" });
    }

    deal.title = title ?? deal.title;
    deal.terms = terms ?? deal.terms;
    deal.price = price ?? deal.price;
    deal.status = status ?? deal.status; // ✅ Ahora puedes cambiar a 'closed' o 'cancelled'

    const updatedDeal = await deal.save();
    res.json(updatedDeal);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el deal", error: error.message });
  }
};

// Eliminar un deal
const deleteDeal = async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id);
    if (!deal) {
      return res.status(404).json({ message: "Deal no encontrado" });
    }

    await deal.deleteOne();
    res.json({ message: "Deal eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el deal", error: error.message });
  }
};

module.exports = {
  createDeal,
  getDeals,
  getDealById,
  updateDeal,
  deleteDeal,
};