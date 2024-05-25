import React, { useContext, useEffect, useState } from 'react';
import img from '../../public/img/bg.jpg';
import photoIcon from '../../public/img/photo-lg-0.jpg'
import iconClose from '../../public/img/btn-close.jpg'
import save from '../../public/img/btn-save.jpg'
import modificar from '../../public/img/btn-update.jpg'
import iconCamera from '../../public/img/iconCameraPng.png'
import { useNavigate, useParams } from 'react-router-dom';
import { FaAngleLeft } from "react-icons/fa";
import axiosClient from '../axiosClient.js';
import { MascotasContext } from './../../context/MascotasContext.jsx'

const MascotasForm = () => {
    const [generos, setGeneros] = useState([]);
    const [razas, setRazas] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const { mode, getMascotasId, mascota } = useContext(MascotasContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
 
    const [formData, setFormData] = useState({
        nombre: '',
        categoria: '',
        imagen: '',
        raza: '',
        genero: ''
    });
 
    useEffect(() => {
        axiosClient.get('/opcion/genero').then((response) => {
            setGeneros(response.data);
        });
        axiosClient.get('/opcion/razas').then((response) => {
            setRazas(response.data);
        });
        axiosClient.get('/opcion/categorias').then((response) => {
            setCategorias(response.data);
        });
    }, []);

    useEffect(() => {
        if (mode === 'update' && mascota) {
            setFormData({
                nombre: mascota.nombre_mascota || "",
                categoria: mascota.id_categoria || "",
                imagen: mascota.imagen || "",
                genero: mascota.id_genero || "",
                raza: mascota.id_raza || ""
            });
        }
    }, [mode, mascota]);

    useEffect(() => {
        if (mode === "update") {
            getMascotasId(id);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'file' ? files[0] : value
        }));
    };

    const volver = () => {
        navigate('/inicio');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const datosSubmit = new FormData();
        datosSubmit.append('nombre', formData.nombre);
        datosSubmit.append('raza', formData.raza);
        datosSubmit.append('categoria', formData.categoria);
        datosSubmit.append('imagen', formData.imagen);
        datosSubmit.append('genero', formData.genero);

        try {
            if (mode === "update") {
                await axiosClient.put(`/mascotas/actualizarMascota/${id}`, datosSubmit);
            } else {
                datosSubmit.append('dueno', user.id_user);
                await axiosClient.post(`/mascotas/registrarMascotas`, datosSubmit);
            }
            alert("Operación realizada exitosamente");
            navigate('/inicio');
        } catch (error) {
            console.error('Error del servidor', error);
            alert("Ha ocurrido un error al procesar la solicitud");
        }
    };

    
    const logout = () => {
        localStorage.clear();
        navigate('/');
    }
    return (
        <div className='flex flex-col items-center min-h-screen' style={{ backgroundImage: `url(${img})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className='flex mt-28 items-center justify-between'>
                <FaAngleLeft className='mr-20 flex text-white text-xl cursor-pointer' onClick={volver} />
                <label className='flex mr-20 text-white font-semibold'> {mode === "create" ? "Adicionar mascota" : "Actualizar mascota"} </label>
                <div className='ml-10'>
                    <img className='rounded-full cursor-pointer' src={iconClose} onClick={() => logout()} alt="Cerrar" />
                </div>            </div>
            <div className='mt-16'>
                <img className='rounded-full' src={mode === 'create' ? photoIcon : `http://localhost:3000/img/${mascota.imagen}`}/>
            </div>
            <form onSubmit={handleSubmit} className='w-full max-w-sm pt-24'>
                <div className='mb-4'>
                    <input
                        type='text'
                        id='nombre'
                        name='nombre'
                        placeholder='Nombre Mascota'
                        value={formData.nombre}
                        onChange={handleChange}
                        className='w-full bg-[#8d9db9] px-3 py-2 rounded-3xl border border-gray-400  focus:outline-none ml-5 placeholder-blue-950'
                        style={{ height: '40px', width: '90%' }}
                        required
                    />
                </div>
                <div className='mb-4'>
                    <select className='w-[345px] bg-[#8d9db9] px-3 py-2 rounded-3xl border border-gray-400  focus:outline-none ml-5 placeholder-blue-950'
                        value={formData.raza}
                        onChange={handleChange}
                        name="raza"
                        id="raza">
                        <option value="" hidden> Seleccione la raza. </option>
                        {razas.map(race => (
                            <option key={race.id_raza} value={race.id_raza}> {race.nombre_raza} </option>
                        ))}
                    </select>
                </div>
                <div className='mb-4'>
                    <select className='w-[345px] bg-[#8d9db9] px-3 py-2 rounded-3xl border border-gray-400  focus:outline-none ml-5 placeholder-blue-950'
                        name="categoria"
                        value={formData.categoria}
                        onChange={handleChange}
                        id="">
                        <option value="" hidden> Seleccione categoria. </option>
                        {categorias.map(categoria => (
                            <option key={categoria.id_categoria} value={categoria.id_categoria}> {categoria.nombre_categoria} </option>
                        ))}
                    </select>
                </div>
                <div className='relative mb-4 flex justify-center'>
                    <input
                        placeholder="Imagen de usuario"
                        type="file"
                        name="imagen"
                        className="hidden"
                        id="fileInput"
                        onChange={handleChange}
                    />
                    <label htmlFor="fileInput" className="cursor-pointer items-center w-[345px] flex bg-[#8d9db9] rounded-full border">
                        <div className="flex items-center w-[200px] h-10 transition duration-300">
                            <span className="text-blue-950 w-full ml-4">
                                Seleccionar imagen
                            </span>
                        </div>
                    </label>
                    <img src={iconCamera} alt="camera" className="absolute top-0 right-8 mt-3 ml-3 rounded-full" style={{ width: '20px', height: '20px' }} />
                </div>
                <div className='mb-4'>
                    <select className='w-[345px] bg-[#8d9db9] px-3 py-2 rounded-3xl border border-gray-400  focus:outline-none ml-5 placeholder-blue-950'
                        name="genero"
                        value={formData.genero}
                        onChange={handleChange}
                        id="">
                        <option value="" hidden> Seleccione Genero</option>
                        {generos.map(genero => (
                            <option key={genero.id_genero} value={genero.id_genero}> {genero.nombre_genero} </option>
                        ))}
                    </select>
                </div>
                <button type="submit">
                    {mode === 'create' ? (
                        <img className='rounded-full ml-5 cursor-pointer font-bold' style={{ width: '90%' }} src={save} alt="" />
                    ) : (
                        <img className='rounded-full ml-5 cursor-pointer' style={{ width: '90%' }} src={modificar} alt="" />
                    )}
                </button>
            </form>
        </div>
    );
}

export default MascotasForm;
