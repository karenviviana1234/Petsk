import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const baseURL = "http://localhost:3000/validar";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Los campos son obligatorios");
      return;
    }

    try {
      const response = await axios.post(baseURL, { email, password });

      if (response.status === 200) {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user[0]));
        console.log('bienvenido '+token)
        alert('Bienvenido: '+user.fullname)
        navigate('/listar')
      } 
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Credenciales incorrectas");
      } else {
        alert("Error del servidor " + error);
      }
    }
  };

  return (
    <div
      style={{
        position: "relative",
        backgroundImage: "url('/bg-login.svg')",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "85%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "330px",
          padding: "20px",
          borderRadius: "10px",
          
        }}
      >
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Correo Electronico"
            className="w-full p-1 mb-4 bg-slate-50 opacity-75 rounded-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-1 mb-4 bg-slate-50 opacity-75 rounded-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            style={{ backgroundColor: "#2C4674" }}
            className="w-full p-2 mb-4 rounded-full text-zinc-50"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
