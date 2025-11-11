const nodemailer = require("nodemailer");
const sendEmail = async (opitions) => {
  //1) create transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  //2)define the email opitions
  const mailOpitions = {
    from: "asmatullah6090@gmail.com",
    to: opitions.email,
    subject: opitions.subject,
    text: opitions.message,
  };
  //3) actully send the email
  await transporter.sendMail(mailOpitions);
};
module.exports = sendEmail;
