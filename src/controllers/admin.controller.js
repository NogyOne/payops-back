import { prisma } from '../utils/dbConnect.js'
import bcrypt from 'bcrypt'

export const addAdminUser = async (req, res) => {
    const { name, username, email, password } = req.body

    if (!name || !username || !email || !password) {
        return res.status(401).json({ message: 'Please provide all requiered fields' })
    }

    const salt = await bcrypt.genSalt()
    const securePass = bcrypt.hashSync(password, salt)

    try {
        const newAdmin = await prisma.adminUser.create({
            data: {
                name: name,
                username: username,
                email: email,
                password: securePass,
            },
        })
        res.json(newAdmin)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getAdminUsers = async (req, res) => {
    try {
        const adminUsers = await prisma.adminUser.findMany()
        res.json(adminUsers)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getAdminUsersById = async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(401).json({ message: 'Please provide an id' })
    }

    try {
        const admin = await prisma.adminUser.findFirst({
            where: {
                id: +id,
            },
        })
        res.json(admin)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getAdminUserByUsername = async (req, res) => {
    const { username } = req.params

    if (!username) {
        return res.status(401).json({ message: 'Please provide a username' })
    }

    try {
        const admin = await prisma.adminUser.findFirst({
            where: {
                username: username,
            },
        })
        res.json(admin)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getAdminUserByName = async (req, res) => {
    const { name } = req.params

    if (!name) {
        return res.status(401).json({ message: 'Please provide a name' });
    }

    try {
        const admin = await prisma.adminUser.findFirst({
            where: {
                name: name,
            },
        })
        res.json(admin)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteAdminUser = async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(401).json({ message: 'Please provide an id' })
    }

    try {
        const deletedAdmin = await prisma.adminUser.delete({
            where: {
                id: +id,
            },
        })
        res.json(deletedAdmin)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateAdminUser = async (req, res) => {
    const { id } = req.params
    let { password } = req.body
    if (!id || !password) {
        res.status(400).json({ message: 'Please provide all fields' })
    }

    const salt = await bcrypt.genSalt()
    password = bcrypt.hashSync(password, salt)

    try {
        const updatedAdmin = await prisma.adminUser.update({
            where: {
                id: +id
            },
            data: {
                password: password
            }
        })
        res.json(updatedAdmin)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}