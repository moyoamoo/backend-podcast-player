const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: ``,
  tls: { rejectUnauthorized: false }, //turns security of as cheap server
  port: 587,
  secure: false, //allow use of port 587 must be true if port 465
  auth: {
    user: ``,
    pass: ``,
  },
});

function sendEmail(payload, sender, to) {
  const mailOptions = {
    from: `test@tinsleymail.co.uk`,
    to: to[0].email,
    subject: payload.subject,
    text: payload.content,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    console.log(error, info);
  });
}

module.exports = { sendEmail };