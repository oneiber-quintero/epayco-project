const SOAP_URL = process.env.SOAP_URL || "http://localhost:8000/wsdl";

exports.registerClient = async (req, res) => {
  const body = req.body;
  const url = `${SOAP_URL}/register`;
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        cod_error: "99",
        message_error: "Error interno",
      });
    });
};

exports.topUpWalletClient = async (req, res) => {
  const body = req.body;
  const url = `${SOAP_URL}/top-up-wallet`;
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        cod_error: "99",
        message_error: "Error interno",
      });
    });
};

exports.checkBalanceClient = async (req, res) => {
  const body = req.body;
  const url = `${SOAP_URL}/check-balance`;
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        cod_error: "99",
        message_error: "Error interno",
      });
    });
};

exports.payoutClient = async (req, res) => {
  const body = req.body;
  const url = `${SOAP_URL}/payout`;
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        cod_error: "99",
        message_error: "Error interno",
      });
    });
};
