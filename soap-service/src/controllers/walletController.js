const Client = require("../models/clientModel");

exports.registerClient = async (req, res) => {
  const body = req.body;
  const { document, names, email, cellphone } = body;

  if (!document || !names || !email || !cellphone) {
    res.status(401).json({
      success: false,
      cod_error: "01",
      message_error: "Campos requeridos faltantes",
      data: {},
    });
  }

  const client = new Client({
    document,
    names,
    email,
    cellphone,
    balance: 0,
  });

  try {
    await client.save();
    if (!client) {
      res.status(401).json({
        success: false,
        cod_error: "02",
        message_error: "Error registrando cliente",
        data: {},
      });
    }
    res.status(200).json({
      success: true,
      cod_error: "00",
      message_error: "Cliente registrado con éxito",
      data: client,
    });
  } catch (e) {
    if (e.code === 11000) {
      res.status(401).json({
        success: false,
        cod_error: "02",
        message_error: "cliente duplicado",
        data: {},
      });
    } else {
      res.status(401).json({
        success: false,
        cod_error: "02",
        message_error: "Error registrando cliente",
        data: {},
      });
    }
  }
};
