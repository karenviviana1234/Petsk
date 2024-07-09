import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AgregarMascotas() {
  const [formData, setFormData] = useState({
    Nombre: "",
    race_id: "",
    category_id: "",
    gender_id: "",
    photo: null,
  });

  const [razas, setRazas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [imagePreview, setImagePreview] = useState(null); // Estado para la vista previa de la imagen
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const ListarGenero = async () => {
    const url = 'http://localhost:3000/genero/listarGenero';
    try {
      const response = await axios.get(url,{header:{token:token}});
      if (response.status === 200) {
        const gender = response.data.genders.map((item) => ({
          nombre: item.name,
          value: item.id,
        }));
        setGeneros(gender);
      }
    } catch (error) {
      console.error('Error del servidor:', error);
    }
  };

  const ListarCategoria = async () => {
    const url = 'http://localhost:3000/categorias/listarCategoria';
    try {
      const response = await axios.get(url,{headers:{token:token}});
      if (response.status === 200) {
        const category = response.data.categoria.map((item) => ({
          nombre: item.name,
          value: item.id,
        }));
        setCategorias(category);
      }
    } catch (error) {
      console.error('Error del servidor:', error);
    }
  };

  const ListarRaza = async () => {
    const url = 'http://localhost:3000/raza/listarRaza';
    try {
      const response = await axios.get(url,{header:{token:token}});
      if (response.status === 200) {
        const raza = response.data.races.map((item) => ({
          nombre: item.name,
          value: item.id,
        }));
        setRazas(raza);
      }
    } catch (error) {
      console.error('Error del servidor:', error);
    }
  };

  useEffect(() => {
    ListarRaza();
    ListarCategoria();
    ListarGenero();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      photo: file,
    }));
    setImagePreview(URL.createObjectURL(file)); 
  };

  const handleAgregar = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("Nombre", formData.Nombre);
    data.append("race_id", formData.race_id);
    data.append("category_id", formData.category_id);
    data.append("gender_id", formData.gender_id);
    data.append("photo", formData.photo);

    try {
      const response = await axios.post(
        "http://localhost:3000/mascota/registrarMascota",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token:token
          },
        }
      );

      if (response.status === 200) {
        alert("Mascota registrada con éxito");
        navigate('/listar')
      } else {
        alert("Error al agregar la mascota");
      }
    } catch (error) {
      console.error("Error al agregar la mascota: ", error);
      alert("Error al agregar la mascota: " + error.message);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        backgroundImage: "url('/bg.svg')",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "8%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "330px",
          padding: "20px",
          color: "#fff",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img src="/btn-back.svg" alt="" style={{ cursor: "pointer" }} onClick={()=>navigate('/listar')}/>
        <h1 style={{ margin: "auto", padding: 35 }}>Adicionar Mascotas</h1>
        <img
          src="/btn-close.svg"
          alt=""
          style={{ width: "24px", height: "24px", cursor: "pointer" }}
          onClick={()=>navigate('/listar')}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "330px",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <img src={imagePreview || "/photo-lg-0.svg"} alt="Vista previa" /> {/* Mostrar la imagen seleccionada */}
      </div>
      <div
        style={{
          position: "absolute",
          top: "70%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "300px",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <form onSubmit={handleAgregar}>
          <input
            type="text"
            name="Nombre"
            value={formData.Nombre}
            onChange={handleChange}
            className="w-full p-1 mb-4 bg-slate-50 opacity-55 rounded-full"
            style={{ textIndent: "10px" }}
            placeholder="Nombre"
          />
          <select
            name="race_id"
            value={formData.race_id}
            onChange={handleChange}
            className="w-full p-1 mb-4 bg-slate-50 opacity-55 rounded-full"
            style={{
              backgroundImage: "url('arrows.svg')",
              appearance: "none",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "calc(100% - 10px) center",
              backgroundSize: "10px",
              textIndent: "10px",
              color: "#6D7C96",
            }}
          >
            <option value="">Seleccionar Raza</option>
            {razas.map((raza) => (
              <option key={raza.value} value={raza.value}>
                {raza.nombre}
              </option>
            ))}
          </select>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="w-full p-1 mb-4 bg-slate-50 opacity-55 rounded-full"
            style={{
              backgroundImage: "url('arrows.svg')",
              appearance: "none",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "calc(100% - 10px) center",
              backgroundSize: "10px",
              textIndent: "10px",
              color: "#6D7C96",
            }}
          >
            <option value="">Seleccione Categoria</option>
            {categorias.map((category) => (
              <option key={category.value} value={category.value}>
                {category.nombre}
              </option>
            ))}
          </select>
          <div className="relative w-full mb-4">
            <input
              type="file"
              id="file-upload"
              onChange={handleFileChange}
              className="absolute w-full h-full opacity-0 cursor-pointer z-10"
            />
            <label
              htmlFor="file-upload"
              className="flex items-center w-full p-1 bg-slate-50 opacity-55 rounded-full cursor-pointer"
              style={{
                backgroundImage: "url('icon-camera.svg')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "calc(100% - 10px) center",
                backgroundSize: "20px",
                color: "#6D7C96",
                textIndent: "10px",
              }}
            >
              Subir Foto
            </label>
          </div>
          <select
            name="gender_id"
            value={formData.gender_id}
            onChange={handleChange}
            className="w-full p-1 mb-4 bg-slate-50 opacity-55 rounded-full"
            style={{
              backgroundImage: "url('arrows.svg')",
              appearance: "none",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "calc(100% - 10px) center",
              backgroundSize: "10px",
              textIndent: "10px",
              color: "#6D7C96",
            }}
          >
            <option value="">Seleccione Genero</option>
            {generos.map((item) => (
              <option key={item.value} value={item.value}>
                {item.nombre}
              </option>
            ))}
          </select>

          <button type="submit">
            <img style={{}} src="/btn-save.svg" alt="Guardar" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default AgregarMascotas;
