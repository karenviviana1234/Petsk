import { Router } from "express";
import { listarCategorias, listarGenero, listarRazas, listarUsers } from "../controllers/controllerOpcion.js"

const opcionesRoute = Router()

opcionesRoute.get('/categorias', listarCategorias)

opcionesRoute.get('/genero', listarGenero)

opcionesRoute.get('/razas', listarRazas)

opcionesRoute.get('/users', listarUsers)

export default opcionesRoute