import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotas } from '../context/NotasContext';
import FormularioNota from '../components/FormularioNota';

export default function NuevaNota() {
  const { agregarNota } = useNotas();
  const navigate = useNavigate();

  const handleGuardar = (datosNota) => {
    agregarNota(datosNota);
    navigate('/notas'); // Redirección programática al guardar (Ejercicio 4)
  };

  return (
    <div className="page-container form-page">
      <h2>Crear Nueva Nota</h2>
      <FormularioNota 
        textoBoton="Guardar Nota" 
        alGuardar={handleGuardar} 
        alCancelar={() => navigate('/notas')}
      />
    </div>
  );
}