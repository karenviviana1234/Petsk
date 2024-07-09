import { Router } from "express";
import {  createUsuario } from "../controllers/usuario.js";

const routerUsuario = Router();

routerUsuario.post('/crearUsuario', createUsuario);

export default routerUsuario;
