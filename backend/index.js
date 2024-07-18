import express from 'express'
import body_parser from 'body-parser'
import cors from 'cors'
import userRoutes from './src/routes/user.routes.js'
import petRoutes from './src/routes/pet.routes.js'
import authRoutes from './src/routes/auth.routes.js'
import { validarToken } from './src/controllers/auth.controller.js'

const server = express()

// Configuracion
server.use(body_parser.json())
server.use(body_parser.urlencoded({ extended: false }))
server.use(cors())

server.use(authRoutes)
server.use(validarToken, userRoutes)
server.use(validarToken, petRoutes)

server.listen(3333, () => {
    console.log('Servidor corriendo en el puerto http://localhost:3333/');
})