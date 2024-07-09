import { query } from "express";
import { pool } from "../database/conexion.js";
import multer from "multer"

const storage = multer.diskStorage({
  destination: function(req,file,cb){
     cb(null, "public/img")
  },
  filename:function(req,file,cb){
    cb(null, file.originalname)
  }
})

const upload = multer({storage: storage})

export const cargarPhoto = upload.single('photo')


export const CrearMascota = async (req, res) => {
  try {
      const { Nombre, race_id, category_id, gender_id } = req.body;
      let photo = req.file ? req.file.originalname : null;

      const [resultado] = await pool.promise().query(
          'INSERT INTO pets (Nombre, race_id, category_id, Photo, gender_id) VALUES (?, ?, ?, ?, ?)',
          [Nombre, race_id, category_id, photo, gender_id]
      );

      if (resultado.affectedRows > 0) {
          res.status(200).json({ message: 'Mascota registrada con éxito' });
      } else {
          res.status(404).json({ message: 'No se pudo registrar la Mascota' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Error del servidor: ' + error.message });
  }
};



export const listarMascotas = async (req, res) => {
  try {
    const [pets] = await pool
  .promise()
  .query(
    `SELECT 
      nombre, 
      pets.id, 
      races.name AS race_name, 
      categories.name AS category_name, 
      pets.photo, 
      genders.name AS gender_name 
    FROM 
      pets 
    JOIN 
      races ON pets.race_id = races.id 
    JOIN 
      categories ON pets.category_id = categories.id 
    JOIN 
      genders ON pets.gender_id = genders.id;`
  );

    if (pets.length > 0) {
      res.status(200).json({ pets });
    } else {
      res.status(404).json({ message: "No hay mascotas registrados" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error del servidor: " + error.message });
  }
};

export const buscarMascota2 = async(req,res)=>{
  try {
    const {id} =req.params
    const [pets] = await pool.promise().query(
        `SELECT 
            pets.id, 
            pets.nombre, 
            races.id AS race_id, 
            races.name AS race_name, 
            categories.id AS category_id, 
            categories.name AS category_name, 
            pets.photo, 
            genders.id AS gender_id, 
            genders.name AS gender_name 
        FROM 
            pets 
        JOIN 
            races ON pets.race_id = races.id 
        JOIN 
            categories ON pets.category_id = categories.id 
        JOIN 
            genders ON pets.gender_id = genders.id 
        WHERE 
            pets.id = ?`, 
        [id]
    );
    
    if (pets.length > 0) {
      res.status(200).json({ pets });
    } else {
      res.status(404).json({ message: "No hay usuarios registrados" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error del servidor: " + error.message });
  }
};

export const actualizarMascota = async (req, res) => {
  try {
    const { id } = req.params;
    const { Nombre, race_id, category_id, gender_id } = req.body;

    const [anteriorPet] = await pool.promise().query("SELECT * FROM pets WHERE id=?", [id]);
    const [photoAnterior] = await pool.promise().query(`SELECT photo FROM pets WHERE id=?`,[id])
    
    if (!anteriorPet.length) {
      return res.status(404).json({
        message: "No se encontró ninguna mascota con el ID proporcionado",
      });
    }

    let photo = photoAnterior[0].photo;
    if (req.file) {
      photo = req.file.originalname;
    }

    const [resultado] = await pool.promise().query(
      `UPDATE pets SET race_id = ?, category_id = ?, photo = ?, gender_id = ?, Nombre = ? WHERE id = ?`,
      [race_id || anteriorPet[0].race_id, category_id || anteriorPet[0].category_id, photo, gender_id || anteriorPet[0].gender_id, Nombre || anteriorPet[0].Nombre, id]
    );

    if (resultado.affectedRows > 0) {
      res.status(200).json({
        message: "Se actualizó la mascota correctamente",
      });
    } else {
      res.status(500).json({
        message: "No se pudo actualizar la mascota",
      });
    }
  } catch (error) {
    console.error("Error al actualizar la mascota: ", error);
    res.status(500).json({
      message: "Error del servidor",
      error: error.message
    });
  }
};




export const buscarMascota = async(req,res) =>{
  try {
    const {id} = req.params
    const [resultado] = await pool
    .promise()
    .query(
      `SELECT 
        pets.nombre, 
        pets.id, 
        races.name AS race_name, 
        categories.name AS category_name, 
        pets.photo, 
        genders.name AS gender_name 
      FROM 
        pets 
      JOIN 
        races ON pets.race_id = races.id 
      JOIN 
        categories ON pets.category_id = categories.id 
      JOIN 
        genders ON pets.gender_id = genders.id 
      WHERE 
        pets.id = ?`,
      [id]
    );
  
    if (resultado.length>0) {
      res.status(200).json({
        mascota : resultado
      })
    } else {
      res.status(404).json({
        message:'Error al Buscar a la mascota '
      })
    }
  } catch (error) {
    console.log('Error del servidor:  ',error)
  }
}

export const eliminarMascota = async (req, res) => {
  try {
    const { id } = req.params;

    const [resultado] = await pool
      .promise()
      .query("DELETE from pets WHERE id=?", [id]);

    if (resultado.affectedRows > 0) {
      res.status(200).json({
        message: "Se elimino la mascota",
      });
    } else {
      res.status(404).json({
        message: "No se pudo eliminar la mascota",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor " + error,
    });
  }
};
