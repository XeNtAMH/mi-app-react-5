import React, { useState, useEffect } from 'react';

export default function FormularioNota({ valoresIniciales, textoBoton, alGuardar, alCancelar }) {
  const [titulo, setTitulo] = useState(valoresIniciales?.titulo || '');
  const [contenido, setContenido] = useState(valoresIniciales?.contenido || '');
  const [categoria, setCategoria] = useState(valoresIniciales?.categoria || 'personal');
  const [fijada, setFijada] = useState(valoresIniciales?.fijada || false);

  const [errores, setErrores] = useState({ titulo: '', contenido: '' });
  const [botonDeshabilitado, setBotonDeshabilitado] = useState(true);

  // Validaciones en tiempo real (Ejercicio 4)
  useEffect(() => {
    let errTitulo = '';
    let errContenido = '';

    if (titulo.trim().length < 3) {
      errTitulo = 'El título debe tener al menos 3 caracteres.';
    }
    if (contenido.trim().length < 10) {
      errContenido = 'El contenido debe tener al menos 10 caracteres.';
    }

    setErrores({ titulo: errTitulo, contenido: errContenido });
    setBotonDeshabilitado(!!errTitulo || !!errContenido);
  }, [titulo, contenido]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!botonDeshabilitado) {
      alGuardar({ titulo, contenido, categoria, fijada });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="nota-form">
      <div className="form-group">
        <label>Título:</label>
        <input 
          type="text" 
          value={titulo} 
          onChange={(e) => setTitulo(e.target.value)} 
          placeholder="Escribe un título..."
        />
        {errores.titulo && <span className="error-text">{errores.titulo}</span>}
      </div>

      <div className="form-group">
        <label>Contenido:</label>
        <textarea 
          value={contenido} 
          onChange={(e) => setContenido(e.target.value)} 
          placeholder="Escribe el contenido de la nota..."
          rows="5"
        />
        {errores.contenido && <span className="error-text">{errores.contenido}</span>}
      </div>

      <div className="form-group">
        <label>Categoría:</label>
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option value="personal">Personal</option>
          <option value="trabajo">Trabajo</option>
          <option value="estudio">Estudio</option>
          <option value="ideas">Ideas</option>
        </select>
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input 
            type="checkbox" 
            checked={fijada} 
            onChange={(e) => setFijada(e.target.checked)} 
          />
          Fijar esta nota al inicio
        </label>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={botonDeshabilitado}>
          {textoBoton}
        </button>
        <button type="button" className="btn btn-secondary" onClick={alCancelar}>
          Cancelar
        </button>
      </div>
    </form>
  );
}