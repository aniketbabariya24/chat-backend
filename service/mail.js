const nodemailer = require("nodemailer");

require("dotenv").config();

const sendEmail = async (data) => {

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure:true,
    auth: {
      user: 'aniketbabariya2311@gmail.com',
      pass: process.env.GOOGLEKEY
  }
  });

  

  transporter.sendMail({
    to: `${data.email}`,
    from: 'aniketbabariya2311@gmail.com',
    subject: `${data.subject}`,
    html: `${data.body}`,
  })
  .then(()=>console.log('Mail sent successfully'))
  .catch((err)=>console.log("err",err))

}

module.exports = { sendEmail }

