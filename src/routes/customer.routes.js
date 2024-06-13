import { Router } from 'express'
import { prisma } from '../utils/dbConnect.js'
import { addCustomer, getCustomers, getCustomerById, getCustomersByName, deleteCustomer, getCustomersByFilters, getCustomersByStatus, updateCustomer } from '../controllers/customer.controller.js'

const routes = Router()

//Get all customers
routes.get('/customers/:page/:plainText/:status', getCustomersByFilters)
routes.get('/customers/page/:page', getCustomers)
routes.get('/customers/:id', getCustomerById)

//Post a new customer user
routes.post('/customers', addCustomer)

routes.put('/customers/:id', updateCustomer)

//Delete a customer user
routes.delete('/customers/:id', deleteCustomer)

export default routes
