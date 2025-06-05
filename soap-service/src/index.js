const mongoose = require("mongoose");
const express = require("express");
const walletRoutes = require("./routes/walletRoutes");
const PORT = process.env.PORT || 8000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/wallet_db";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error en MongoDB:", err));

const app = express();
app.use(express.json());
app.use("/wsdl", walletRoutes);

app.listen(PORT, () =>
  console.log(`REST corriendo en: http://localhost:${PORT}/wsdl`)
);
