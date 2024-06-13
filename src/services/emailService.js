import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Use `true` for port 465, `false` for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

transporter
  .verify()
  .then(() => {
    console.log('Ready to send emails')
  })
  .catch(error => {
    console.error('Error setting up transporter:', error)
  })

// Función para enviar correos electrónicos con parámetros
export async function sendEmailService(to, subject, text) {
  try {
    const info = await transporter.sendMail({
      from: `"Company name" <${process.env.EMAIL_USER}>`, // dirección del remitente
      to, // lista de receptores
      subject, // línea de asunto
      text, // cuerpo del texto plano
      html, // cuerpo de html (opcional)
    })

    console.log('Message sent: %s', info.messageId)
    return info // Devolver la información del correo enviado
  } catch (error) {
    console.error('Error sending email:', error)
    throw error // Lanzar el error para ser manejado por el controlador
  }
}
