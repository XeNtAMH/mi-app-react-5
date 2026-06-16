import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useNotas } from '../context/NotasContext';

export default function Layout() {
  const { state } = useNotas();
  const totalNotas = state.notas.length;

  return (
    <div className="app-container">
      <header className="main-header">
        <div className="header-content">
          <h1>MisNotas</h1>
          <nav className="nav-bar">
            <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Inicio</NavLink>
            <NavLink to="/notas" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} end>Notas</NavLink>
            <NavLink to="/notas/nueva" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Nueva Nota</NavLink>
          </nav>
        </div>
        <div className="counter-badge">
          Total de Notas Globales: <strong>{totalNotas}</strong>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="main-footer">
        <p>&copy; 2026 MisNotas</p>
      </footer>
    </div>
  );
}