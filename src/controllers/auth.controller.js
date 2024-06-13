import { prisma } from '../utils/dbConnect.js'
import bcrypt from 'bcrypt'

export const login = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json('Please provide all required fields.')
  }

  try {
    const user = await prisma.adminUser.findFirst({
      where: {
        username,
      },
    })
    if (!user) {
      return res.status(400).json({ error: 'User not found' })
    }

    const isMatch = bcrypt.compareSync(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials.' })
    }

    return res.json({ message: 'Logged successfully.', ok: true, user })
  } catch (error) {
    return res.status(500).json({ error: 'Failed to login.' })
  }
}
