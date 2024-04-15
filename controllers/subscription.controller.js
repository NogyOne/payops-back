import { prisma } from '../utils/dbConnect.js'

export const addSubscription = async (monthsPaid) => {
    try {
        const startDate = new Date()
        startDate.setHours(0, 0, 0, 0)
        const endDate = new Date(startDate)
        endDate.setMonth(endDate.getMonth() + monthsPaid)

        const newSubscription = await prisma.subscription.create({
            data: {
                startDate: startDate,
                endDate: endDate,
                monthsPaid: monthsPaid
            }
        })
        return newSubscription
        //res.json(newSubscription)
    } catch (error) {
        throw new Error(error.message)
    }
}

export const getSubscriptions = async (req, res) => {
    try {
        const subscriptions = await prisma.subscription.findMany()
        res.json(subscriptions)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateSubStatus = async (req, res) => {
    const { id } = req.params

    if(!id){
        return res.status(401).json({message: 'Please provide a Subscription to update its status.'})
    }

    try {
        const updatedSubStatus = await prisma.subscription.update({
            where: {
                id: +id
            },
            data:{
                status: 'EXPIRED'
            }
        })
        res.json(updatedSubStatus)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateSubscription = async (req, res) => {
    const { id, monthsPaid } = req.params

    if(!id){
        return res.status(401).json({message: 'Please provide all requiered fields'})
    }

    try {        
        const startDate = new Date()
        startDate.setHours(0, 0, 0, 0)
        
        const endDate = new Date(startDate)
        endDate.setMonth(endDate.getMonth() + parseInt(monthsPaid))

        const updatedSubscription = await prisma.subscription.update({
            where: {
                id: +id
            },
            data: {
                startDate,
                endDate,
                monthsPaid: +monthsPaid,
                status: 'CURRENT'
            }
        })
        res.json(updatedSubscription)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const deleteSubscription = async (req, res) => {
    const { id } = req.params

    if(!id){
        return res.status(404).json('Please select a customer.')
    }

    try {
        const deletedSub = await prisma.subscription.delete({
            where: {
                id: +id
            },
            include: {
                customerUser: true
            }            
        })
        res.json(deletedSub)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}