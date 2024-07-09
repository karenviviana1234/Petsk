import { pool } from "../database/conexion.js";


export const crearGeneros = async(req,res)=>{
try {
    const {id,name} = req.body
    const [resultado]= await pool.promise().query('INSERT INTO genders VALUES (?,?)',[id,name])
    if (resultado.affectedRows > 0) {
        res.status(200).json({
            message: 'Genero registrado con exito'
        })
    } else {
        res.status(404).json({
            message:'No se pudo registrar el genero'
        })
    }
} catch (error) {
    res.status(500).json({
        message:'Error del servidor '+error
    })
}
}

export const listarGenero = async (req,res) =>{
    try {
        const [genders] = await pool.promise().query('SELECT * FROM genders')
        if (genders.length>0) {
            res.status(200).json({
                genders
            })
        } else {
            res.status(404).json({
                message:'No se encontraron genders en la base de datos '
            })
        }
    } catch (error) {
        res.status(500).json({
            message:'Error en el servidor '+error
        })
    }
}
