import express from 'express'
import body_parser from 'body-parser'
import cors from 'cors'
import routerCategoria from './src/routes/categorias.js'
import routerGenero from './src/routes/genero.js'
import routerMascota from './src/routes/mascotaRoute.js'
import routerRaza from './src/routes/raza.js'
import routerUsuario from './src/routes/usuario.js'
import routerValidar from './src/routes/autenticacion.js'

const servidor = express()
servidor.use(cors())

servidor.use(body_parser.json())
servidor.use(body_parser.urlencoded({extend: false}))

servidor.use("/categorias",routerCategoria)
servidor.use("/genero",routerGenero)
servidor.use("/mascota",routerMascota)
servidor.use("/raza",routerRaza)
servidor.use("/usuario",routerUsuario)
servidor.use(routerValidar)

servidor.set("view engine", "ejs")
servidor.set("views", "./view")

servidor.use(express.static('./public'))

servidor.get("/document", (req, res) => {
    res.render("DocumentKaren.ejs")
})

servidor.listen(3000, () => {
    console.log('Servidor funcionando');
})
