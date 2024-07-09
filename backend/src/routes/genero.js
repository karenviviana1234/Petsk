import { Router } from "express";
import { crearGeneros, listarGenero } from "../controllers/genero.js";

const routerGenero = Router()

routerGenero.post('/creargenero',crearGeneros)
routerGenero.get('/listarGenero',listarGenero)

export default routerGenero