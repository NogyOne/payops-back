import express from 'express'
import cors from 'cors'
import adminsRoutes from '../routes/admin.routes.js'
import customersRoutes from '../routes/customer.routes.js'
import subscriptionRoutes from '../routes/subscription.routes.js'
import authRoutes from '../routes/auth.routes.js'

const PORT = process.env.PORT

const app = express()

app.use(cors())
app.use(express.json())

app.use(adminsRoutes)
app.use(customersRoutes)
app.use(subscriptionRoutes)
app.use(authRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
