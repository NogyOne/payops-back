import { Router } from 'express'
import { addSubscription, updateSubscription, getSubscriptionsWithUsers } from '../controllers/subscription.controller.js' 

const routes = Router()

routes.put('/subscriptions/:id/:monthsPaid', updateSubscription)

routes.get('/subscriptions', getSubscriptionsWithUsers)

export default routes