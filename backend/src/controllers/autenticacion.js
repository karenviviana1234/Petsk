import { pool } from "../database/conexion.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const validar = async (req, res) => {
    try {
        let { email, password } = req.body;

        const [userResult] = await pool.promise().query('SELECT * FROM users WHERE email = ?', [email]);

        if (userResult.length > 0) {
            const user = userResult[0];

            const match = await bcrypt.compare(password, user.password);

            if (match) {
                const token = jwt.sign({ user }, process.env.AUT_SECRET, { expiresIn: process.env.AUT_EXPIRE });

                return res.status(200).json({ user, token });
            } else {
                return res.status(401).json({ status: 401, message: 'Contraseña incorrecta' });
            }
        } else {
            return res.status(404).json({ status: 404, message: 'Usuario no encontrado' });
        }
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Error del servidor: ' + error.message });
    }
};

export const validarToken = async (req, res, next) => {

    try {
        
        let tokenClient = req.headers['token']

        if(!tokenClient){
            return res.status(403).json({'message': 'Token es requerido'})
        }else{
            const token = jwt.verify(tokenClient, process.env.AUT_SECRET, (error, decoded) => {
                if(error){
                    return res.status(403).json({message: 'Token es obligatorio'})
                }else{
                    next()
                }
            })
        }

    } catch (error) {
        return res.status(500).json({status: 500, message: 'Error del servidor' + error})
    }
    
}