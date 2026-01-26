const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Por favor agrega un nombre"],
    },
    description: {
      type: String,
      required: [true, "Por favor agrega una descripción"],
    },
    price: {
      type: Number,
      required: [true, "Por favor agrega un precio"],
      default: 0,
    },
    category: {
      type: String,
      required: [true, "Por favor agrega una categoría"],
    },
    stock: {
      type: Number,
      required: [true, "Por favor agrega el stock"],
      default: 0,
    },
    // ESTA ES LA LÍNEA QUE FALTA
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);