const express = require("express");
const walletRoutes = require("./routes/walletRoutes");
const PORT = process.env.PORT || 3100;
const app = express();
app.use(express.json());
app.use("/wallet", walletRoutes);

app.listen(PORT, () =>
  console.log(`REST corriendo en: http://localhost:${PORT}`)
);
