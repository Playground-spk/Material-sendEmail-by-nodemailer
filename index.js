const express = require("express");
const app = express();
const nodemailer = require("nodemailer");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/email", async (req, res) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,

    auth: {
      user: "tarenodemailer@gmail.com", // generated ethereal user
      pass: "fb231995", // generated ethereal password
    },
  });
  let mail = {};
  mail.from = "tarenodemailer@gmail.com ";
  // html optional properties
  for (let key in req.body) {
    mail[key] = req.body[key];
  }

  if (!mail.to || !mail.subject || !mail.text) {
    res.status(400).send({ message: "please fill up the filed" });
  } else {
    let info = await transporter.sendMail(mail);

    res.status(200).send({ info, message: " email  delivered " });
  }
});

app.listen(8000, () => {
  console.log("server is running on port 8000");
});
