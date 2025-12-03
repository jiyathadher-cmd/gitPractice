const SmtpController = require('../controllers/smtpController');

const verification = (options) => {
    console.log(options);
    const email = options.email;
    const userName = options.name;

    message = '';
    message += `<!DOCTYPe html>
    <html>
    <body>welcome ${userName}</body>
    </html>`;

    SmtpController.sendEmail(email, 'this is your first mail', message);

};
module.exports ={
    verification
}