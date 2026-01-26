const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'El título es obligatorio'],
    },
    terms: {
      type: String,
      required: [true, 'Los términos son obligatorios'],
    },
    price: {
      type: Number,
      required: [true, 'El precio es obligatorio'],
    },
    status: {
      type: String,
      enum: ['draft', 'active', 'closed', 'cancelled'],
      default: 'draft',
    },
    // ✅ Quién vende (el dueño del producto/servicio)
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // ✅ Quién compra o solicita (el usuario autenticado)
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // ✅ Referencias opcionales para saber qué se está negociando
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
    },
  },
  {
    timestamps: true,
  }
);

const Trade = mongoose.model('Trade', tradeSchema);

module.exports = Trade;