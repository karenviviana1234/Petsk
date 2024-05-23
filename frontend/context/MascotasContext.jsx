import React, { Children, createContext, useState } from 'react'
import axiosClient from '../src/axiosClient';
import Swal from 'sweetalert2';

export const MascotasContext = createContext()

export const MascotasProvider = ({ children }) => {

    const [mascotas, setMascotas] = useState([])
    const [mascota, setMascota] = useState([])
    const [idMascota, setIdMascota] = useState(0)
    const [mode, setMode] = useState('create')

    const getMascotas = () => {
        try {
            axiosClient.get('/mascotas/listar').then((response) => {
                setMascotas(response.data)
            })
        } catch (error) {
            console.log('Error del servidor' + error);
        }
    }

    const getMascotasId = async (id) => {
        if (!id) {
            console.error("No ID provided to getMascotasId");
            return;
        }
        try {
            const response = await axiosClient.get(`/mascotas/buscar/${id}`);
            setMascota(response.data[0]);
        } catch (error) {
            console.log('Error del servidor' + error);
        }
    };

    const deleteMascotas = (id) => {
        try {
            axiosClient.delete(`/mascotas/eliminar/${id}`).then((response) => {
                alert(response.data.message)
            })
        } catch (error) {
            console.log('Error del servidor' + error);
        }
    }

  return (
    <MascotasContext.Provider
        value={{
            idMascota, 
            mascotas,
            mascota,
            mode,
            setMode,
            setMascotas,
            setMascota,
            setIdMascota,
            getMascotas,
            getMascotasId,
            deleteMascotas
        }}
    >
        {children}
    </MascotasContext.Provider>
  )
}
