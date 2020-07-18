let nodemailer = require('nodemailer');
// require('dotenv').config();
var path = require('path');
let environment = process.env;

module.exports.SMTPTransport = nodemailer.createTransport({
    host: environment.SMTP_SERVICE_HOST,
    port: environment.SMTP_SERVICE_PORT,
    secure: environment.SMTP_SERVICE_SECURE,
    debug: true,
    logger: true,
    auth: {
        user: environment.SMTP_USER_NAME,
        pass: environment.SMTP_USER_PASSWORD
    }
});

module.exports.ViewOption = (transport, hbs) => {
    transport.use('compile', hbs({
            viewPath: path.join(__dirname, '../views/email'),
            extName: '.hbs'
    }));
}