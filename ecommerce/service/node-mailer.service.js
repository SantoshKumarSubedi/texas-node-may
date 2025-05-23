const mailer = require("nodemailer");
const { mailerConfig } = require("../config/mailer-config");

const sendMail = (toEmail, message, subject) => {
  const transport = mailer.createTransport(mailerConfig);
  transport.sendMail(
    {
      to: toEmail,
      subject: subject,
      html: false,
      sender: "Texas Ecommerce",
      text: message,
    },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Mail Sent Successfully");
      }
    }
  );
};

module.exports = { sendMail };
