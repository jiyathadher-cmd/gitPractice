const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
console.log('process is: ', process.env.EMAIL_PASS)
module.exports = {
    sendEmail: (to, subject, message) => {
        transport = nodemailer.createTransport(
            smtpTransport({
                host: 'smtp.gmail.com',
                port: 587,
                debug: true,
                sendmail: true,
                requiresAuth: true,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
                tls: {
                    rejectUnauthorized: false,
                },
            })
        );
        console.log('auth data :', process.env.EMAIL_USER, process.env.EMAIL_PASS)
        transport.sendMail(
            {
                from: 'welcome <' + process.env.EMAIL_USER + '>',
                to: 'jiya30454@gmail.com',
                subject: subject,
                html: message,
            },
            function (err, info) {
                console.log(err, info, "====kjhkasd")
            }
        );
    },
    
}
