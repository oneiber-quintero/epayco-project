const { v4: uuidv4 } = require("uuid");
const Client = require("../models/clientModel");
const Payout = require("../models/payoutModel");
const { sendEmail } = require("../services/mail");

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

exports.checkBalanceClient = async (req, res) => {
  const body = req.body;
  const { document, cellphone } = body;

  if (!document || !cellphone) {
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

  res.status(200).json({
    success: true,
    cod_error: "00",
    message_error: "solicitar saldo con éxito",
    data: clientFound,
  });
};

exports.payoutClient = async (req, res) => {
  const body = req.body;
  const { document, cellphone, transactionId } = body;

  if (!document || !cellphone || !transactionId) {
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

  const payoutFound = await Payout.findOne({
    clientId: clientFound._id,
    transactionId: transactionId,
  }).exec();

  if (payoutFound) {
    let message_error = "Error no tienes pagos pendiente";
    if (payoutFound.status === "pending") {
      message_error = "Error ya tienes un pago pendiente";
    } else if (payoutFound.status === "payed") {
      message_error = "Error ya pagaste esta orden";
    } 
    res.status(401).json({
      success: false,
      cod_error: "02",
      message_error: message_error,
      data: {},
    });

    return;
  }

  const token = Math.floor(100000 + Math.random() * 900000).toString();
  const sessionId = uuidv4();

  // TODO se hace la consulta a transactions para obtener el total a
  // pagar, no lo hare pero tomare un total aleatorio.
  // valor obtenido de la simulación de la transacción XD
  const total = Math.floor(100 + Math.random() * 1000);

  const payout = new Payout({
    clientId: clientFound._id,
    transactionId: transactionId,
    total: total,
    sessionId: sessionId,
    token: token,
    status: "pending",
  });

  try {
    await payout.save();
    const subject = `Token de confirmacion de pago ${new Date().toLocaleDateString()}`;
    const message = `hola ${clientFound.names},\n\n token: ${token}\n sessionId: ${sessionId}\n\n\n gracias por preferirnos`;
    const email = clientFound.email;
    await sendEmail(email, subject, message);
    if (!payout) {
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
      message_error:
        "Se ha enviado un correo más el id de sesión que debe ser usado en la confirmación de la compra",
      data: {},
    });
  } catch (e) {
    if (e.code === 11000) {
      res.status(401).json({
        success: false,
        cod_error: "02",
        message_error: "pago duplicado",
        data: {},
      });
    } else {
      res.status(401).json({
        success: false,
        cod_error: "02",
        message_error: "Error solicitar pago",
        data: {},
      });
      return;
    }
  }
};
