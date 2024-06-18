import { sendEmailService } from '../services/emailService.js'

export const sendEmail = async (req, res) => {
  const { from, to, subject, html } = req.body

  if (!from || !to || !subject || !html) {
    return res
      .status(400)
      .json({ message: 'Please provide all required fields.' })
  }

  try {
    const info = await sendEmailService(from, to, subject, html)
    res.status(200).json({ message: 'Email sent succesfully.', info })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error sending email.', error: error.message })
  }
}
