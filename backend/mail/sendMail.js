import nodeMailer from "nodemailer";

const sendMail = async (req, res, emailData) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PWD,
    },
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
    },
  });
  return await transporter
    .sendMail(emailData)
    .then((info) => {
      console.log(`Message sent ${info.response}`);
      return res.json({
        message: "Email has been sent",
      });
    })
    .catch((err) => console.log(`Problem sending mail ${err}`));
};

export default sendMail;
