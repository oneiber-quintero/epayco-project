const SOAP_URL = process.env.SOAP_URL || "http://localhost:8000/wsdl";

exports.registerClient = async (req, res) => {
  const body = req.body;
  fetch(SOAP_URL, {
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
