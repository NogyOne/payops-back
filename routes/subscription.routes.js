import { Router } from 'express'
import { addSubscription, updateSubscription, getSubscriptions, updateSubStatus } from '../controllers/subscription.controller.js' 

const routes = Router()

routes.put('/subscriptions/:id/:monthsPaid', updateSubscription)

routes.patch('/subscriptions/:id', updateSubStatus)

routes.get('/subscriptions', getSubscriptions)

export default routes