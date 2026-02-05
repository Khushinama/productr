import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
    service : "gmail",
    auth: {
        user : process.env.SENDER_EMAIL,
        pass : process.env.SMTP_PASS
    }
})

transporter.verify()
  .then(() => console.log("SMTP Ready"))
  .catch(err => console.error("SMTP Failed:", err));

export default transporter;
