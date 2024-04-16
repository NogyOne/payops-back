import { prisma } from '../utils/dbConnect.js'
import { addSubscription } from './subscription.controller.js'

const PAGE_SIZE = 6

export const getCustomers = async (req, res) => {
    const { page } = req.params;

    try {
        const customers = await prisma.customerUser.findMany({
            take: PAGE_SIZE,
            skip: (page - 1) * PAGE_SIZE,
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
    const { adminUser, name, monthsPaid, email } = req.body
    if (!adminUser || !name || !email) {
        return res.status(401).json('Please provide all requiered fields')
    }
    try {
        let subscription
        if (!monthsPaid) {
            subscription = await addSubscription(1)
        }
        else {
            subscription = await addSubscription(monthsPaid)
        }

        if (!subscription) {
            return res.status(500).json({ message: 'Failed to create subscription' })
        }

        const newCustomer = await prisma.customerUser.create({
            data: {
                name,
                email,
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

    if (!id) {
        return res.status(401).json('Please provide an Id')
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
    const { name } = req.params

    if (!name) {
        return res.status(401).json('Please provide a name')
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
export const updateCustomer = async (req, res) => {
    const { id } = req.params
    const { name, email } = req.body

    if (!id) {
        return res.status(401).json('Please select a customer.')
    }

    try {
        const updatedCustomer = await prisma.customerUser.update({
            where: {
                id: +id
            },
            data: {
                name,
                email,
            }
        })
        res.json(updatedCustomer)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteCustomer = async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(404).json('Please select a customer.')
    }

    try {
        const deletedCustomer = await prisma.customerUser.delete({
            where: {
                id: +id
            },
        })
        res.json(deletedCustomer)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}