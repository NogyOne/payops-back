import { Router } from 'express'
import { sendEmail } from '../controllers/email.controller.js'

const routes = Router()

routes.post('/send', sendEmail)

export default routes
