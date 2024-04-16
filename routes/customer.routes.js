import { Router } from 'express'
import { prisma } from '../utils/dbConnect.js'
import { addCustomer, getCustomers, getCustomerById, getCustomersByName, deleteCustomer } from '../controllers/customer.controller.js'

const routes = Router()

//Get all customers
routes.get('/customers/page/:page', getCustomers)
routes.get('/customers/:id', getCustomerById)
routes.get('/customers/name/:name', getCustomersByName)

//Post a new customer user
routes.post('/customers', addCustomer)

//Delete a customer user
routes.delete('/customers/:id', deleteCustomer)

export default routes
