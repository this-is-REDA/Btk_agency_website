import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER || 'btkagency0@gmail.com',
      pass: process.env.EMAIL_PASS || 'your-app-password'
    }
  });
};

export default async function sendEmail(to, subject, html, text) {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER || 'btkagency0@gmail.com',
      to,
      subject,
      html,
      text
    };
    
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email envoyé:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('❌ Erreur envoi email:', error);
    return { success: false, error: error.message };
  }
}
