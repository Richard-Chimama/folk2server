const dotenv = require("dotenv");
dotenv.config();

const SendMail = (to) => {
  return {
    from: process.env.SMTP_SENDER,
    to: process.env.SMTP_USER,
    subject: "New customer registration",
    html: `
    <!DOCTYPE html>
<html lang='sw'>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            width: 80%;
            margin: 0 auto;
        }
        .header {
            background-color: #f4f4f4;
            padding: 20px;
            text-align: center;
        }
        .content {
            margin: 20px 0;
        }
        .footer {
            background-color: #f4f4f4;
            padding: 10px;
            text-align: center;
            font-size: 0.9em;
        }
        .button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Customer</h1>
        </div>
        <div class="content">
            <p>Hey!,</p>
            <p>New customer has join the community</p>
            <i>Email: ${to}</i>
            <p>Folk till folk secondhand Store Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Secondhand Store. Alla rättigheter förbehållna..</p>
        </div>
    </div>
</body>
</html>

      `,
  };
};

module.exports = SendMail;
