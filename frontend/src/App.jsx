import { BrowserRouter, Route, Routes } from "react-router-dom"
import 'tailwindcss/tailwind.css';

import Login from "./components/pages/Login.jsx"
import ProtectedRoute from "./ProtectedRoute.jsx"
import ListarMascota from "./components/pages/ListarMascotas.jsx";
import RegistrarMascota from "./components/pages/RegistrarMascota.jsx";
import ActualizarMascota from "./components/pages/ActualizarMascota.jsx";
import ConsultarMascota from "./components/pages/ConsultarMAscotas.jsx";
import { MascotasProvider } from "../context/MascotasContext.jsx";


function App() {

  return (
   
        <MascotasProvider>
          <BrowserRouter>    
          

          {/*   <Sidebar /> */}
            <Routes>
              <Route path="/" element={<Login />} />
              <Route element={<ProtectedRoute />} > 
                <Route path="/inicio" element={<ListarMascota />} />
                <Route path="/register" element={<RegistrarMascota />} />
                <Route path="/actualizar/:id" element={<ActualizarMascota />} />
                <Route path="/consultar/:id" element={<ConsultarMascota />} />
              </Route>
            </Routes> 
          </BrowserRouter>
        </MascotasProvider>
    
  )
}

export default App;
