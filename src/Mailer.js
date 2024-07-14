const nodemailer = require("nodemailer");

class Mailer {
  constructor({ host, port, secure = true, auth }) {
    this.host = host;
    this.port = port;
    this.secure = secure;
    this.auth = auth;
  }

  setTransporter() {
    this.transporter = nodemailer.createTransport({
      host: this.host,
      port: this.port,
      secure: this.secure,
      auth: {
        user: this.auth.user,
        pass: this.auth.pass,
      },
    });
  }

  static setOptions({ from, to, subject, html }) {
    return {
      from,
      to,
      subject,
      html,
    };
  }

  async sendMail(mailOptions) {
    if (!this.transporter) {
      this.setTransporter();
    }
    const options = Mailer.setOptions(mailOptions);
    try {
      this.transporter.verify((error, success) => {
        if (error) {
          throw Error(error);
        }
      });
      await this.transporter.sendMail(options);
    } catch (error) {
      console.error("Error sending email: ", error);
      throw error;
    }
  }
}

module.exports = Mailer;
