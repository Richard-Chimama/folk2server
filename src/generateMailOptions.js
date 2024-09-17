const dotenv = require("dotenv");
dotenv.config();

const generateMailOptions = (to) => {
  return {
    from: process.env.SMTP_SENDER,
    to: to,
    subject: "Välkommen till vår secondhandbutik",
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
            <h1>Tack för att du kontaktar oss!</h1>
        </div>
        <div class="content">
            <p>Hey!,</p>
            <p>Vi har tagit emot ditt meddelande och kommer att svara så snart som möjligt.</p>
            <p>Vänligen utforska och följ oss på <a href="https://www.instagram.com/folktfolk/"> Instagram </a> för att upptäcka vår nuvarande kollektion av förälskade kläder och skor.</p>
            <p>Glad shopping!</p>
            <p>Folk till folk secondhand Store Team</p>
            <a class="button" href="https://maps.app.goo.gl/BVYyk5CPuyDTGSd48">Besök vår butik</a>
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

module.exports = generateMailOptions;
