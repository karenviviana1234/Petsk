import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './ListarMascotas.css';  // Import the CSS file

function ListarMascotas() {
  const [mascotas, setMascotas] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const obtenerMascotas = async () => {
    try {
      const response = await axios.get("http://localhost:3000/mascota/listar", { headers: { token: token } });
      setMascotas(response.data.pets);
      console.log(response.data.pets);
      console.log(token);
    } catch (error) {
      console.error("Error al obtener las mascotas:", error);
    }
  };

  useEffect(() => {
    obtenerMascotas();
  }, []);

  const EliminarMascota = async (id) => {
    const url = `http://localhost:3000/mascota/eliminar/${id}`;
    try {
      const resultado = await axios.delete(url, { headers: { token: token } });
      if (resultado.status === 200) {
        alert('Mascota eliminada exitosamente ');
        console.log('mascota eliminada correctamente ', id);
        obtenerMascotas();
      } else {
        alert('No se pudo eliminar la mascota ');
      }
    } catch (error) {
      console.error('Error al eliminar las mascotas ', error.message);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Administrar Mascotas</h1>
        <img className="btn-close" onClick={() => navigate('/')} src="/btn-close.svg" alt="Cerrar" />
      </div>
      <div className="add-button" onClick={() => navigate("/registrar")}>
        <img src="btn-add.svg" alt="Agregar" />
      </div>
      <div className="list-container">
        {mascotas.map((item) => (
          <div key={item.id} className="pet-card">
            <img className="pet-photo" alt={item.photo} src={`http://localhost:3000/img/${item.photo}`} />
            <div className="pet-info">
              <h2 className="pet-name">{item.nombre}</h2>
              <h3 className="pet-race">{item.race_name}</h3>
            </div>
            <div className="action-buttons">
              <img className="btn-action" src="/btn-delete.svg" alt="Eliminar" onClick={() => EliminarMascota(item.id)} />
              <img className="btn-action" src="/btn-edit.svg" alt="Editar" onClick={() => navigate(`/editar/${item.id}`)} />
              <img className="btn-action" src="/btn-show.svg" alt="Mostrar" onClick={() => navigate(`/buscar/${item.id}`)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListarMascotas;
