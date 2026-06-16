import React from 'react';
import { useNotas } from '../context/NotasContext';
import { Link } from 'react-router-dom';

export default function Notas() {
  const { state, cambiarFiltro, cambiarBusqueda, toggleFijada } = useNotas();
  const { notas, filtroCategoria, busqueda } = state;

  // Filtrado simultáneo por texto y categoría (Ejercicio 3)
  const notasFiltradas = notas.filter(nota => {
    const cumpleFiltro = filtroCategoria === 'todas' || nota.categoria === filtroCategoria;
    const cumpleBusqueda = nota.titulo.toLowerCase().includes(busqueda.toLowerCase()) || 
                           nota.contenido.toLowerCase().includes(busqueda.toLowerCase());
    return cumpleFiltro && cumpleBusqueda;
  });

  // Clasificación de prioridad: Notas fijadas van arriba (Ejercicio 3)
  const notasFijadas = notasFiltradas.filter(n => n.fijada);
  const notasRestantes = notasFiltradas.filter(n => !n.fijada);

  const renderCard = (nota) => (
    <div key={nota.id} className={`nota-card ${nota.fijada ? 'fijada' : ''}`}>
      <Link to={`/notas/${nota.id}`} className="card-link-wrapper">
        <div className="card-header">
          <h4>{nota.titulo}</h4>
          
          {/* Contenedor alineado horizontalmente para evitar la superposición */}
          <div className="card-actions-wrapper">
            <span className={`badge badge-${nota.categoria}`}>{nota.categoria}</span>
            
            <button 
              className={`btn-pin ${nota.fijada ? 'pinned' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation(); // Evita navegar hacia el detalle (Ejercicio 3)
                toggleFijada(nota.id);
              }}
              title={nota.fijada ? "Desfijar nota" : "Fijar nota"}
            >
              {nota.fijada ? '📌 Fijada' : '📌'}
            </button>
          </div>
        </div>
        
        <p className="card-body">
          {nota.contenido.length > 100 ? `${nota.contenido.substring(0, 100)}...` : nota.contenido}
        </p>
        <div className="card-footer">
          <small>{new Date(nota.fechaCreacion).toLocaleDateString()}</small>
        </div>
      </Link>
    </div>
  );

  return (
    <div className="page-container">
      <h2>Tus Notas</h2>
      
      {/* Controles de Filtrado (Ejercicio 3) */}
      <div className="filters-container">
        <input 
          type="text" 
          placeholder="Buscar por título o contenido..." 
          value={busqueda} 
          onChange={(e) => cambiarBusqueda(e.target.value)}
          className="search-input"
        />
        <select 
          value={filtroCategoria} 
          onChange={(e) => cambiarFiltro(e.target.value)}
          className="filter-select"
        >
          <option value="todas">Todas las categorías</option>
          <option value="personal">Personal</option>
          <option value="trabajo">Trabajo</option>
          <option value="estudio">Estudio</option>
          <option value="ideas">Ideas</option>
        </select>
      </div>

      <div className="results-counter">
        Mostrando <strong>{notasFiltradas.length}</strong> resultados de un total de <strong>{notas.length}</strong> notas.
      </div>

      {notasFiltradas.length === 0 ? (
        <p className="no-results">No se encontraron notas que coincidan con los filtros aplicados.</p>
      ) : (
        <div className="notes-section">
          {/* Sección de Notas Fijadas (Ejercicio 3) */}
          {notasFijadas.length > 0 && (
            <div className="notes-group pinned-group">
              <h3>Notas Fijadas</h3>
              <div className="notes-grid">
                {notasFijadas.map(renderCard)}
              </div>
            </div>
          )}

          {/* Sección de Otras Notas */}
          {notasRestantes.length > 0 && (
            <div className="notes-group">
              {notasFijadas.length > 0 && <h3>Otras Notas</h3>}
              <div className="notes-grid">
                {notasRestantes.map(renderCard)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}