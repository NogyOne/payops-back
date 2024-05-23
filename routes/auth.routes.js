import { Router } from 'express'
import { login } from '../controllers/auth.controller.js'

const routes = Router()

routes.post('/auth/login', login)

export default routes
