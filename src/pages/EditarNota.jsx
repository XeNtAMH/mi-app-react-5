import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useNotas } from '../context/NotasContext';
import FormularioNota from '../components/FormularioNota';

export default function EditarNota() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, editarNota } = useNotas();

  const nota = state.notas.find(n => n.id === id);

  if (!nota) {
    return (
      <div className="page-container error-view">
        <h3>Nota no encontrada</h3>
        <p>No se puede editar una nota inexistente.</p>
        <Link to="/notas" className="btn btn-secondary">Volver</Link>
      </div>
    );
  }

  const handleGuardar = (datosModificados) => {
    editarNota(nota.id, datosModificados);
    navigate(`/notas/${nota.id}`); // Redirige de vuelta a su detalle (Ejercicio 4)
  };

  return (
    <div className="page-container form-page">
      <h2>Editar Nota</h2>
      <FormularioNota 
        valoresIniciales={nota}
        textoBoton="Guardar Cambios"
        alGuardar={handleGuardar}
        alCancelar={() => navigate(`/notas/${nota.id}`)}
      />
    </div>
  );
}