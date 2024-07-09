import { Router } from "express";
import { actualizarMascota, buscarMascota2, buscarMascota, cargarPhoto, CrearMascota, eliminarMascota, listarMascotas } from "../controllers/controller.mascota.js";
import {  validarToken } from "../controllers/autenticacion.js";


const routerMascota = Router()

routerMascota.post('/registrarMascota',validarToken,cargarPhoto,CrearMascota)
routerMascota.get('/listar',validarToken,listarMascotas)
routerMascota.get('/buscar2/:id',validarToken,buscarMascota2)
routerMascota.put('/actualizar/:id',validarToken,cargarPhoto,actualizarMascota)
routerMascota.delete('/eliminar/:id',validarToken,eliminarMascota)
routerMascota.get('/buscar/:id',validarToken,buscarMascota)


export default routerMascota