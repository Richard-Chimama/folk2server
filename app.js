const dotenv = require("dotenv");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const Mailer = require("./src/Mailer");
const generateMailOptions = require("./src/generateMailOptions");
const helmet = require('helmet')
const CORS = require('cors')

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const HOST = "0.0.0.0";

// const whitelist = ['http://0.0.0.0:4000', 'https://www.folktfolk.se']
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

app.use(express.json());
app.use(helmet())
//app.use(CORS(corsOptions))
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.post("/", async (req, res) => {
  const email = req.body.email;

  const transportProps = {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  };

  const mailOptions = generateMailOptions(email)

  const mailer = new Mailer(transportProps);

  try {
    await mailer.sendMail(mailOptions);
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
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(PORT, HOST, () => {
  console.log(`server running on http://${HOST}:${PORT}`);
});