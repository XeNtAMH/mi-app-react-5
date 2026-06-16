import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useNotas } from '../context/NotasContext';

export default function DetalleNota() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, eliminarNota } = useNotas();

  const nota = state.notas.find(n => n.id === id);

  if (!nota) {
    return (
      <div className="page-container error-view">
        <h3>Nota no encontrada</h3>
        <p>El identificador de la nota no existe o fue removido.</p>
        <Link to="/notas" className="btn btn-secondary">Volver a notas</Link>
      </div>
    );
  }

  const handleEliminar = () => {
    if (window.confirm('¿Estás completamente seguro de que deseas eliminar esta nota?')) {
      eliminarNota(nota.id);
      navigate('/notas'); // Redirección programática (Ejercicio 3)
    }
  };

  return (
    <div className="page-container single-note-container">
      <div className={`card single-note-view ${nota.fijada ? 'fijada' : ''}`}>
        <div className="single-note-header">
          <h2>{nota.titulo}</h2>
          <div className="header-badges">
            <span className={`badge badge-${nota.categoria}`}>{nota.categoria}</span>
            {nota.fijada && <span className="badge badge-pinned">📌 Fijada</span>}
          </div>
        </div>
        
        <p className="single-note-content">{nota.contenido}</p>
        
        <div className="single-note-footer">
          <p><strong>Fecha de Creación:</strong> {new Date(nota.fechaCreacion).toLocaleString()}</p>
        </div>

        <div className="single-note-actions">
          <Link to="/notas" className="btn btn-secondary">Volver a notas</Link>
          <Link to={`/notas/${nota.id}/editar`} className="btn btn-primary">Editar</Link>
          <button onClick={handleEliminar} className="btn btn-danger">Eliminar</button>
        </div>
      </div>
    </div>
  );
}