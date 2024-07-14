const dotenv = require('dotenv')
const Mailer = require('./Mailer')

dotenv.config()

const transportProps = {
    host: 'smtp.example.com',
    port: 587,
    secure: false,
    auth: {
      user: 'user@example.com',
      pass: 'password',
    },
  };
  
  const mailOptions = {
    from: 'sender@example.com',
    to: 'receiver@example.com',
    subject: 'Test Email',
    html: '<h1>Hello World</h1>',
  };
  
  const mailer = new Mailer(transportProps);

  mailer.sendMail(mailOptions)