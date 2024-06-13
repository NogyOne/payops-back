import { Router } from 'express'
import { addAdminUser, deleteAdminUser, getAdminUserByUsername, getAdminUsers, getAdminUsersById, getAdminUserByName, updateAdminUser } from '../controllers/admin.controller.js'

const routes = Router()

//Get all Admin Users
routes.get('/adminUsers', getAdminUsers)

//Get an Admin User from id
routes.get('/adminUsers/:id', getAdminUsersById)

//Get an Admin User from username
routes.get('/adminUsers/username/:username', getAdminUserByUsername)

//Get an Admin User from name
routes.get('/adminUsers/name/:name', getAdminUserByName);

//Post a new Admin User
routes.post('/adminUsers', addAdminUser)

//Delete an Admin with his id
routes.delete('/adminUsers/:id', deleteAdminUser)

//Update admin user (password) **PENDING TO DO
routes.patch('/adminUsers/updatePass/:id', updateAdminUser)

export default routes
