const nodemailer = require("nodemailer");
const sendEmail = (opitions) => {
  //1) create transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user:
    }
  });
  //2)define the email opitions
  //3) actully send the email
};
