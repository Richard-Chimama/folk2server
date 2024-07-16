const dotenv = require("dotenv");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const Mailer = require("./src/Mailer");
const generateMailOptions = require("./src/generateMailOptions");
const helmet = require('helmet');
const CORS = require('cors');
const SendMail = require("./src/SendMail");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const HOST = "0.0.0.0";

const corsOptions = {
  origin: '*'
};

app.use(helmet());
app.use(CORS(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.post("/", async (req, res) => {
  const email = req.body.email;
  const sender = process.env.SMTP_USER

  const transportProps = {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: sender,
      pass: process.env.SMTP_PASS,
    },
  };

  const userMail = generateMailOptions(email);
  const senderMail = SendMail(sender)

  const mailer = new Mailer(transportProps);

  try {
    await mailer.sendMail(userMail);
    await mailer.sendMail(senderMail);
    res.status(200).send("OK");
  } catch (error) {
    res.status(500).send("Error sending email");
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get("env") === "development" ? err : {}
  });
});

app.listen(PORT, HOST, () => {
  console.log(`server running on http://${HOST}:${PORT}`);
});
