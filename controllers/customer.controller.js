import { prisma } from '../utils/dbConnect.js'
import { addSubscription, updateSubscription } from './subscription.controller.js'

const PAGE_SIZE = 6

export const getCustomers = async (req, res) => {
    const {page} = req.params
    
    // if(+page === 0){
    //     return res.status(400).json('Please provide all requiered fields')
    // }

    try {
        const customers = await prisma.customerUser.findMany({
            take: PAGE_SIZE,
            skip: (page - 1) * PAGE_SIZE,
            include: {
                subscription: true
            },
            orderBy: {
                id: 'desc'
            }
        }) 
        res.json(customers)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getCustomersForFilters = async (page) => {
    try {
        const customers = await prisma.customerUser.findMany({
            take: PAGE_SIZE,
            skip: (page - 1) * PAGE_SIZE,
            include: {
                subscription: true
            },
            orderBy: {
                id: 'desc'
            }
        })
        return customers
    } catch (error) {
        throw new Error(error.message)
    }
}

export const getCustomersByFilters = async (req, res) => {
    let { page, plainText, status } = req.params
    status = String(status).toUpperCase().trim()
    //Date filter could be wait to an update
    try {
        if (plainText.trim().length === 0) {
            if (status === 'ALL') {                
                return res.json(await getCustomersForFilters (page))
            }
            else {
                return res.json(await getCustomersByStatus(status, page))
            } 
        }
        else if(status === 'ALL'){
            return res.json(await getCustomersByName(plainText))
        }
        const customers = await prisma.customerUser.findMany({
            take: PAGE_SIZE,
            skip: (page - 1) * PAGE_SIZE,
            include: {
                subscription: true
            },
            where: {
                name: {
                    contains: plainText
                },
                subscription: {
                    status
                }
            },
            orderBy: {
                id: 'desc'
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
        return res.status(400).json('Please provide all requiered fields')
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

export const getCustomersByStatus = async (status, page) => {
    if(!status){
        return res.status(400).json('Please provide a status')
    }
    
    try {
        const customers = await prisma.customerUser.findMany({
            take: PAGE_SIZE,
            skip: (page - 1) * PAGE_SIZE,
            where: {
                subscription: {
                    status
                }
            },
            include: {
                subscription: true
            },
            orderBy: {
                id: 'desc'
            }
        })
        return customers
    } catch (error) {
        throw new Error(error.message)
    }
}

export const getCustomersByName = async (name) => {

    if (!name) {
        return res.status(400).json('Please provide a name')
    }

    try {
        const customer = await prisma.customerUser.findMany({
            where: {
                name: {
                    contains: name
                }
            },
            include: {
                subscription: true
            },
            orderBy: {
                id: 'desc'
            }
        })
        return customer
    } catch (error) {
        throw new Error(error.message)
    }
}

export const updateCustomer = async (req, res) => {
    const { id } = req.params
    const customer = req.body
    const { name, email, idSub, monthsPaid } = customer
    console.log(customer)
    console.log(name, email, idSub, monthsPaid)
    if (!id) {
        return res.status(400).json('Please select a customer.')
    }

    try {

        let subscription
        if (!monthsPaid) {
            subscription = await updateSubscription(idSub, 1)
        }
        else {
            subscription = await updateSubscription(idSub, monthsPaid)
        }

        if (!subscription) {
            return res.status(500).json({ message: 'Failed to create subscription' })
        }

        const updatedCustomer = await prisma.customerUser.update({
            where: {
                id: +id
            },
            data: {
                name,
                email,
            },
            include: {
                subscription: true
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
            include: {
                subscription: true
            }
        })
        res.json(deletedCustomer)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}