import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NotasProvider } from "./context/NotasContext.jsx";

// Importación de Componentes y Vistas
import Layout from './components/Layout';
import Inicio from './pages/Inicio';
import Notas from './pages/Notas';
import NuevaNota from './pages/NuevaNota';
import DetalleNota from './pages/DetalleNota';
import EditarNota from './pages/EditarNota';
import NoEncontrada from './pages/NoEncontrada';

export default function App() {
  return (
    <NotasProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta del Layout que anida todas las vistas */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Inicio />} />
            <Route path="notas" element={<Notas />} />
            <Route path="notas/nueva" element={<NuevaNota />} />
            <Route path="notas/:id" element={<DetalleNota />} />
            <Route path="notas/:id/editar" element={<EditarNota />} />
            {/* Capturador de error 404 */}
            <Route path="*" element={<NoEncontrada />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </NotasProvider>
  );
}