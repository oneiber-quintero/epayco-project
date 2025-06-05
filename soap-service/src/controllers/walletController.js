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

exports.topUpWalletClient = async (req, res) => {
  const body = req.body;
  const { document, cellphone, credit } = body;

  if (!document || !cellphone || !credit) {
    res.status(401).json({
      success: false,
      cod_error: "01",
      message_error: "Campos requeridos faltantes",
      data: {},
    });
  }

  const clientFound = await Client.findOne({
    document: document,
    cellphone: cellphone,
  }).exec();

  if (!clientFound) {
    res.status(401).json({
      success: false,
      cod_error: "02",
      message_error: "Error client no existe",
      data: {},
    });
    return;
  }

  const balance = clientFound.balance + credit;
  const request = {
    document: document,
    cellphone: cellphone,
    balance: balance,
  };

  const clientUpdate = await Client.findByIdAndUpdate(
    clientFound._id,
    request,
    { new: true }
  ).exec();

  res.status(200).json({
    success: true,
    cod_error: "00",
    message_error: "Cliente recargado con éxito",
    data: clientUpdate,
  });
};
