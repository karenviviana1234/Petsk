import { Router } from "express";
import { registrarMascota, listarMascotas, actualizarMascota, eliminarMascota, buscarMascota, cargarImage } from "../controllers/controller.mascota.js"
import { validarToken } from "../controllers/autenticacion.js";

const MascotasRoute = Router()

MascotasRoute.get('/listar',validarToken, listarMascotas)
MascotasRoute.post('/registrarMascotas', validarToken, cargarImage, registrarMascota)
MascotasRoute.put('/actualizar/:id', validarToken, cargarImage, actualizarMascota)
MascotasRoute.get('/buscar/:id',validarToken, buscarMascota)
MascotasRoute.delete('/eliminar/:id',validarToken, eliminarMascota)

export default MascotasRoute