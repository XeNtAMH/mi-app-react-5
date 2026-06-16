import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';

const NotasContext = createContext();

// Estado inicial con 5 notas precargadas (Ejercicio 1)
const estadoInicial = {
  notas: JSON.parse(localStorage.getItem('mis_notas')) || [
    {
      id: "1",
      titulo: "Comprar materiales",
      contenido: "Ir a la tienda por papel de colores, pegamento y cartulinas para los cake toppers.",
      categoria: "trabajo",
      fijada: true,
      fechaCreacion: new Date("2026-06-10").toISOString()
    },
    {
      id: "2",
      titulo: "Idea de nueva pintura",
      contenido: "Hacer un lienzo usando técnicas de acuarela mezcladas con acrílico brillante.",
      categoria: "ideas",
      fijada: true,
      fechaCreacion: new Date("2026-06-12").toISOString()
    },
    {
      id: "3",
      titulo: "Estudiar React Router",
      contenido: "Repasar el uso de useParams, useNavigate y rutas anidadas para el examen.",
      categoria: "estudio",
      fijada: false,
      fechaCreacion: new Date("2026-06-14").toISOString()
    },
    {
      id: "4",
      titulo: "Cumpleaños de mi novia",
      contenido: "Planificar la cena sorpresa y preparar una tarjeta hecha a mano muy especial.",
      categoria: "personal",
      fijada: false,
      fechaCreacion: new Date("2026-06-15").toISOString()
    },
    {
      id: "5",
      titulo: "Optimizar inventario",
      contenido: "Revisar stock de cartulinas y pinturas disponibles en Mel's Creations.",
      categoria: "trabajo",
      fijada: false,
      fechaCreacion: new Date("2026-06-16").toISOString()
    }
  ],
  filtroCategoria: 'todas',
  busqueda: ''
};

// Reducer para manejo inmutable del estado (Ejercicio 1)
function notasReducer(state, action) {
  switch (action.type) {
    case 'AGREGAR_NOTA':
      return { ...state, notas: [action.payload, ...state.notas] };
    case 'ELIMINAR_NOTA':
      return { ...state, notas: state.notas.filter(n => n.id !== action.payload) };
    case 'EDITAR_NOTA':
      return {
        ...state,
        notas: state.notas.map(n => n.id === action.payload.id ? { ...n, ...action.payload.datos } : n)
      };
    case 'TOGGLE_FIJADA':
      return {
        ...state,
        notas: state.notas.map(n => n.id === action.payload ? { ...n, fijada: !n.fijada } : n)
      };
    case 'CAMBIAR_FILTRO':
      return { ...state, filtroCategoria: action.payload };
    case 'CAMBIAR_BUSQUEDA':
      return { ...state, busqueda: action.payload };
    default:
      return state;
  }
}

export function NotasProvider({ children }) {
  const [state, dispatch] = useReducer(notasReducer, estadoInicial);
  const [notificacion, setNotificacion] = useState(null);

  // Guardar en LocalStorage automáticamente ante cualquier cambio (Ejercicio 5)
  useEffect(() => {
    localStorage.setItem('mis_notas', JSON.stringify(state.notas));
  }, [state.notas]);

  // Sistema simplificado de Notificaciones Toast (Ejercicio 5)
  const mostrarToast = (mensaje) => {
    setNotificacion(mensaje);
    setTimeout(() => setNotificacion(null), 3000);
  };

  // Acciones expuestas del contexto (Ejercicio 1)
  const agregarNota = (nota) => {
    const nuevaNota = {
      ...nota,
      id: Date.now().toString(),
      fechaCreacion: new Date().toISOString()
    };
    dispatch({ type: 'AGREGAR_NOTA', payload: nuevaNota });
    mostrarToast('¡Nota agregada con éxito!');
  };

  const eliminarNota = (id) => {
    dispatch({ type: 'ELIMINAR_NOTA', payload: id });
    mostrarToast('Nota eliminada correctamente.');
  };

  const editarNota = (id, datos) => {
    dispatch({ type: 'EDITAR_NOTA', payload: { id, datos } });
    mostrarToast('¡Nota editada guardada!');
  };

  const toggleFijada = (id) => {
    dispatch({ type: 'TOGGLE_FIJADA', payload: id });
    mostrarToast('Estado de fijación actualizado.');
  };

  const cambiarFiltro = (categoria) => {
    dispatch({ type: 'CAMBIAR_FILTRO', payload: categoria });
  };

  const cambiarBusqueda = (texto) => {
    dispatch({ type: 'CAMBIAR_BUSQUEDA', payload: texto });
  };

  return (
    <NotasContext.Provider value={{
      state,
      agregarNota,
      eliminarNota,
      editarNota,
      toggleFijada,
      cambiarFiltro,
      cambiarBusqueda
    }}>
      {notificacion && (
        <div className="toast-notification">
          {notificacion}
        </div>
      )}
      {children}
    </NotasContext.Provider>
  );
}

// Hook personalizado useNotas (Ejercicio 1)
export function useNotas() {
  const context = useContext(NotasContext);
  if (!context) {
    throw new Error('useNotas debe ser utilizado dentro de un NotasProvider');
  }
  return context;
}