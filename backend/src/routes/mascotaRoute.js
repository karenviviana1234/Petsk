import { Router } from "express";
import { registrarMascota, listarMascotas, actualizarMascota, eliminarMascota, buscarMascota, cargarImage } from "../controllers/controller.mascota.js"
import { validarToken } from "../controllers/autenticacion.js";

const MascotasRoute = Router()

MascotasRoute.get('/listarMascota',validarToken, listarMascotas)
MascotasRoute.post('/registrarMascotas', validarToken, cargarImage, registrarMascota)
MascotasRoute.put('/actualizarMascota/:id', validarToken, cargarImage, actualizarMascota)
MascotasRoute.get('/buscarMascota/:id',validarToken, buscarMascota)
MascotasRoute.delete('/eliminarMascota/:id',validarToken, eliminarMascota)

export default MascotasRoute