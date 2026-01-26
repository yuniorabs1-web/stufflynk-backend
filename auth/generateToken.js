const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  // Intentamos leer del .env, si no existe, usamos la cadena de texto fija
  const secret = process.env.JWT_SECRET || "ClaveTemporalStufflynk2026";

  console.log("🔑 Generando token con secreto:", secret === process.env.JWT_SECRET ? "Del archivo .env" : "Manual de emergencia");

  return jwt.sign({ id }, secret, {
    expiresIn: '30d',
  });
};

module.exports = generateToken;