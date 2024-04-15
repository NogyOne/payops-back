import { Router } from 'express'
import { updateSubscription, getSubscriptions, updateSubStatus, deleteSubscription } from '../controllers/subscription.controller.js' 

const routes = Router()

routes.put('/subscriptions/:id/:monthsPaid', updateSubscription)

routes.patch('/subscriptions/:id', updateSubStatus)

routes.get('/subscriptions', getSubscriptions)

routes.delete('/subscriptions/:id', deleteSubscription)

export default routes