import { prisma } from '../utils/dbConnect.js'
import { addSubscription } from './subscription.controller.js'

export const getCustomers = async (req, res) => {
    try {
        const customers = await prisma.customerUser.findMany({
            include: {
                subscription: true
            }
        })
        res.json(customers)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const addCustomer = async (req, res) => {
    const { adminUser, name, monthsPaid } = req.body
    if (!adminUser || !name ) {
        return res.status(400).json('Please provide all requiered fields')
    }
    try {
        let subscription
        if (!monthsPaid){
            subscription = await addSubscription(1)
        }
        else{
            subscription = await addSubscription(monthsPaid)
        }
            
        if (!subscription) {
            return res.status(500).json({ message: 'Failed to create subscription' })
        }

        const newCustomer = await prisma.customerUser.create({
            data: {
                name,
                adminUserId: adminUser,
                subscriptionId: subscription.id
            }
        })
        res.json(newCustomer)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getCustomerById = async (req, res) => {
    const { id } = req.params
    
    if( !id ){
        return res.status(400).json('Please provide an Id')
    }
    
    try {
        const customer = await prisma.customerUser.findFirst({
            where: {
                id: parseInt(id)
            },
            include: {
                subscription: true
            }
        })
        res.json(customer)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }   
}

export const getCustomersByName = async (req, res) => {
    const { name} = req.params

    if( !name ){
        return res.status(400).json('Please provide a name')
    }

    try {
        const customer = await prisma.customerUser.findMany({
            where: {
                name: name
            }
        })
        res.json(customer)
    } catch (error) {
        res.status(500).json({ message: error.message }) 
    }
}