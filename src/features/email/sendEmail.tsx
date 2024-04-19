import nodemailer from 'nodemailer';

export const sendEmail = async (to: string, subject: string, text: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD
        },
      });
    
      const mailOptions = {
        from: 'adb.dev.france@gmail.com',
        to: to,
        subject: subject,
        text: text,
      };

      try {
        const info = await transporter.sendMail(mailOptions);
        console.log('E-mail envoyé :', info.response);
      } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
      }
  };