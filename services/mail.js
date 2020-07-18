const MailConfig = require("../config/email");
const hbs = require("nodemailer-express-handlebars");
const smtpTransport = MailConfig.SMTPTransport;

module.exports.SendMail = async (context, template, subject) => {
  MailConfig.ViewOption(smtpTransport, hbs);
  
  let HelperOptions = {
    from: `"${process.env.MAIL_FROM_NAME}"  ${process.env.MAIL_FROM_ADDRESS}`,
    to: context.to,
    bcc: process.env.CONTACT,
    subject,
    template: template,
    context
  };

  return new Promise((resolve, reject) => {
    smtpTransport.sendMail(HelperOptions, (error, info) => {
        if (error) return reject(error);
        resolve(info);
      });
  });
};
