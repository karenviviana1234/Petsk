import { Router } from "express";
import { validar } from "../controllers/autenticacion.js";

const UserRoute = Router()

UserRoute.post('/validacion', validar)

export default UserRoute