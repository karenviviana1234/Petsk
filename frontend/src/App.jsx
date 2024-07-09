import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import ListarMascotas from './pages/ListarMascotas';
import AgregarMascotas from './pages/AgregarMascota';
import ConsultarMascota from './pages/ConsultarMascota';
import ModificarMascotas from './pages/ModificarMascota';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/listar" element={<ListarMascotas />} />
          <Route path="/editar/:id" element={<ModificarMascotas />} />
          <Route path='/registrar' element={<AgregarMascotas/>}/>
          <Route path='/buscar/:id' element={<ConsultarMascota/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
