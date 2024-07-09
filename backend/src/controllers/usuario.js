import { pool } from "../database/conexion.js";
import bcrypt from 'bcrypt'

const saltRounds = 10

export const createUsuario = async (req, res) => {
    try {
        const { id, fullname, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password,saltRounds)

        const [resultado] = await pool.promise().query('INSERT INTO users (id, fullname, email, password) VALUES (?, ?, ?, ?)',
             [id, fullname, email, hashedPassword]);
        if (resultado.affectedRows > 0) {
            res.status(200).json({ message: 'Usuario registrado con éxito' });
        } else {
            res.status(404).json({ message: 'No se pudo registrar el usuario' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor: ' + error.message });
    }
};