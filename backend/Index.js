import express from 'express'
import body_parser from 'body-parser'
import cors from 'cors'
import MascotasRoute from './src/routes/mascotaRoute.js'
import UserRoute from './src/routes/autenticacion.js'
import opcionesRoute from './src/routes/opcionRoute.js'

const servidor = express()
servidor.use(cors())

servidor.use(body_parser.json())
servidor.use(body_parser.urlencoded({extend: false}))

servidor.use('/mascotas', MascotasRoute)
servidor.use('/user', UserRoute)
servidor.use('/opcion', opcionesRoute)

servidor.set("view engine", "ejs")
servidor.set("views", "./view")

servidor.use(express.static('./public'))

servidor.get("/document", (req, res) => {
    res.render("DocumentKaren.ejs")
})

servidor.listen(3000, () => {
    console.log('Servidor funcionando');
})
