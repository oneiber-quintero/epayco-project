const nodemailer = require("nodemailer");

const MAIL_FROM = process.env.MAIL_FROM || "noreplay@example.com";
const MAIL_HOST = process.env.MAIL_HOST || "gmail";
const MAIL_USER = process.env.MAIL_USER || "1iberpro37@gmail.com";
const MAIL_PASS = process.env.MAIL_PASS || "aeobypfebbbvccsb";

const transporter = nodemailer.createTransport({
  service: MAIL_HOST,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

exports.sendEmail = async function (to, subject, text) {
  try {
    const info = await transporter.sendMail({
      from: MAIL_FROM,
      to,
      subject,
      text,
    });
    // console.log("Correo enviado:", info.messageId);
  } catch (error) {
    console.error("Error enviando email:", error);
  }
};
