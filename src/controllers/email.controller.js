import { sendEmailService } from '../services/emailService.js'

export const sendEmail = async (req, res) => {
  const { to, subject, html } = req.body

  if (!to || !subject || !html) {
    return res
      .status(400)
      .json({ message: 'Faltan parámetros requeridos: to, subject, text' })
  }

  try {
    const info = await sendEmailService(to, subject, html)
    res.status(200).json({ message: 'Correo enviado con éxito', info })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al enviar el correo', error: error.message })
  }
}
