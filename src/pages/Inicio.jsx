import React from 'react';
import { useNotas } from '../context/NotasContext';
import { Link } from 'react-router-dom';

export default function Inicio() {
  const { state } = useNotas();
  const { notas } = state;

  const total = notas.length;
  const fijadas = notas.filter(n => n.fijada).length;
  
  const conteoCategorias = notas.reduce((acc, n) => {
    acc[n.categoria] = (acc[n.categoria] || 0) + 1;
    return acc;
  }, { personal: 0, trabajo: 0, estudio: 0, ideas: 0 });

  return (
    <div className="page-container index-page">
      <h2>¡Bienvenido a MisNotas!</h2>
      <p className="subtitle">Tu espacio organizado para capturar ideas, tareas y proyectos.</p>
      
      <div className="dashboard-grid">
        <div className="card dashboard-card">
          <h3>Total de Notas</h3>
          <p className="dash-number">{total}</p>
        </div>
        <div className="card dashboard-card">
          <h3>Notas Fijadas 📌</h3>
          <p className="dash-number">{fijadas}</p>
        </div>
      </div>

      <h3>Resumen por Categorías</h3>
      <div className="categories-summary-grid">
        <div className="cat-stat-card personal">Personal: <strong>{conteoCategorias.personal}</strong></div>
        <div className="cat-stat-card trabajo">Trabajo: <strong>{conteoCategorias.trabajo}</strong></div>
        <div className="cat-stat-card estudio">Estudio: <strong>{conteoCategorias.estudio}</strong></div>
        <div className="cat-stat-card ideas">Ideas: <strong>{conteoCategorias.ideas}</strong></div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <Link to="/notas" className="btn btn-primary">Ver mis notas</Link>
      </div>
    </div>
  );
}