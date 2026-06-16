import React from 'react';
import { Link } from 'react-router-dom';

export default function NoEncontrada() {
  return (
    <div className="page-container error-404-view">
      <h1>404</h1>
      <h2>Página No Encontrada</h2>
      <p>Lo sentimos, el recurso al que intentas acceder no existe en la aplicación.</p>
      <Link to="/" className="btn btn-primary">Volver al Inicio</Link>
    </div>
  );
}