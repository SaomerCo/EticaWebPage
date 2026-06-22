import { useState } from 'react';
import { NavLink } from 'react-router-dom';

// Enlaces centralizados en un arreglo: agregar una sección nueva al sitio
// (por ejemplo "Ensayos" en una fase futura) es agregar una línea acá,
// no tocar el JSX del menú en dos lugares distintos (desktop y mobile).
const links = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/materias', label: 'Materias' },
  { to: '/descargables', label: 'Descargables' },
  { to: '/calendario', label: 'Calendario' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <NavLink to="/" className="navbar__brand" onClick={() => setOpen(false)}>
          <span className="navbar__brand-mark" aria-hidden="true" />
          PAES Mentor
        </NavLink>

        <button
          className="navbar__toggle"
          aria-expanded={open}
          aria-label="Abrir menú de navegación"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`navbar__links ${open ? 'navbar__links--open' : ''}`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `navbar__link ${isActive ? 'navbar__link--active' : ''}`
              }
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/chat" className="navbar__cta" onClick={() => setOpen(false)}>
            Hablar con la IA
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
