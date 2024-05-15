const nodemailer = require("nodemailer");
const handlebars = require("handlebars");

const transporter = nodemailer.createTransport({
  host: `mail.podlaunch.co.uk`,
  tls: { rejectUnauthorized: false }, //turns security of as cheap server
  port: 465,
  secure: true, //allow use of port 587 must be true if port 465
  auth: {
    user: `help@podlaunch.co.uk`,
    pass: `&T)pdp*^,A_[`,
  },
});

function sendEmail(payload, sender, to) {
  // const template = handlebars.compile(payload.content);
  const mailOptions = {
    from: `help@podlaunch.co.uk`,
    to: to[0].email,
    subject: payload.subject,
    html: payload.content,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    console.log(error, info);
  });
}

module.exports = { sendEmail, transporter };
