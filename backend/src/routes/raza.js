import { Router } from "express";
import {  crearRaza,listarRaza } from "../controllers/raza.js";

const routerRaza = Router()

routerRaza.post('/crear',crearRaza)
routerRaza.get('/listarRaza',listarRaza)

export default routerRaza