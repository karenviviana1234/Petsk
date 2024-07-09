import { pool } from "../database/conexion.js";

export const crearRaza =async (req,res)=>{
    try {
        const {id,name} = req.body

        const [resultado]= await pool.promise().query('INSERT INTO races (id,name) VALUES (?,?)',[id,name])

        if (resultado.affectedRows>0) {
            res.status(200).json({
                message:'Se registro la raza con exito'
            })
        } else {
            res.status(404).json({
                message:'No se pudo registrar la raza'
            })
        }

    } catch (error) {
        res.status(500).json({
            message:'Error del servidor '+error
        })
    }
}


export const listarRaza = async(req,res)=>{
    try {
        const [races] = await pool.promise().query('SELECT * FROM races')
        if (races.length>0) {
            res.status(200).json({
                races
            })
        } else {
            res.status(404).json({
                message:'NO hay razas registradas'
            })
        }
    } catch (error) {
        res.status(500).json({
            message:'Error en el servidor '+error
        })
    }
}