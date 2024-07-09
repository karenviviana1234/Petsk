import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function ConsultarMascota() {
    const navigate =useNavigate()
    const {id} = useParams()
    const [pet,setPet]=useState([])
    const token = localStorage.getItem('token')
    console.log(id)

    useEffect(()=>{
        ListarMascota()
    },[])

    const ListarMascota = async()=>{
        try {
            const url=`http://localhost:3000/mascota/buscar/${id}`
            const mascota = await axios.get(url,{headers:{token:token}})
            setPet(mascota.data.mascota[0])
            console.log(mascota.data.mascota[0])


        } catch (error) {
            
        }
    }
    

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
                alignItems: "center"
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
                    alignItems: "center"
                }}
            >
                <img
                    src="/btn-back.svg"
                    alt=""
                    style={{ cursor: "pointer" }}
                    onClick={()=>navigate('/listar')}
                />
                <h1 style={{ margin: "auto", padding:35 }}>Consultar Mascota</h1>
                <img
                    src="/btn-close.svg"
                    alt=""
                    onClick={()=>navigate('/listar')}
                    style={{ width: "24px", height: "24px", cursor: "pointer" }}
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
                    borderRadius: "10px"
                }}
            >
                <img style={{width:140,height:140}}src={`http://localhost:3000/img/${pet.photo}`} alt="" />
            </div>
            <div style={{
                    position: "absolute",
                    top: "60%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    maxWidth: "300px",
                    padding: "20px",
                    borderRadius: "10px"
                }}>
                <form action="">
                    <img style={{marginBottom:10}}src="/info-name.svg" alt="" />
                    <img style={{marginBottom:10}} src="/info-race.svg" alt="" />
                    <img style={{marginBottom:10}} src="/info-category.svg" alt="" />
                    <img style={{marginBottom:10}} src="/info-gender.svg" alt="" />
                </form>
            </div>
            <div style={{
                    position: "absolute",
                    top: "61%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    maxWidth: "300px",
                    padding: "20px",
                    borderRadius: "10px"
                }}
                >
                    <h2 style={{marginBottom:20, color:"#6D7C96"}}>{pet.nombre}</h2>
                    <h2 style={{marginBottom:20, color:"#6D7C96"}}>{pet.race_name}</h2>
                    <h2 style={{marginBottom:20, color:"#6D7C96"}}>{pet.category_name}</h2>
                    <h2 style={{marginBottom:20, color:"#6D7C96"}}>{pet.gender_name}</h2>
                </div>
        </div>
  )
}

export default ConsultarMascota