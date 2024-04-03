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

export const getSubscriptionsWithUsers = async (req, res) => {
    try {
        const subscriptions = await prisma.subscription.findMany({
            include: {
                customerUser: true
            }
        })
        res.json(subscriptions)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateSubscription = async (req, res) => {
    const { id, monthsPaid } = req.params

    if(!id){
        return res.status(400).json({message: 'Please provide all requiered fields'})
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
                monthsPaid: +monthsPaid
            }
        })
        res.json(updatedSubscription)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}