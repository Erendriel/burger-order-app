import nodemailer from 'nodemailer';

const sendEmail = async (to: string, subject: string, text: string, html: string) => {
  // Configuración del transporte
  const transporter = nodemailer.createTransport({
    service: 'gmail', // o el servicio que uses
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Opciones del correo electrónico
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject,
    text: text,
    html: html,
  };

  // Enviar el correo electrónico
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
