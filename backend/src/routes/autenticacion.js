import { Router } from "express";
import { validar } from "../controllers/autenticacion.js";

const routerValidar =Router()

routerValidar.post('/validar',validar)

export default routerValidar