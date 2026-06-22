import { useEffect, useState } from 'react';
import { fetchDescargables } from '../services/api.js';

const tipos = [
  { value: '', label: 'Todos' },
  { value: 'oficial', label: 'Material oficial' },
  { value: 'ensayo', label: 'Ensayos' },
  { value: 'guia', label: 'Guías' },
  { value: 'formulario', label: 'Formularios' },
];

const tipoLabel = {
  oficial: 'Material oficial',
  ensayo: 'Ensayo',
  guia: 'Guía',
  formulario: 'Formulario',
};

const Descargables = () => {
  const [tipoActivo, setTipoActivo] = useState('');
  const [status, setStatus] = useState('loading');
  const [items, setItems] = useState([]);

  // Se vuelve a pedir a la API cada vez que cambia el filtro, en vez de
  // traer todo una sola vez y filtrar en el navegador. Con pocos
  // registros da lo mismo, pero es el patrón correcto: a medida que la
  // tabla "descargables" crezca, el filtrado en el servidor es el que
  // escala (el navegador nunca tiene que recibir más de lo que necesita).
  useEffect(() => {
    const load = async () => {
      setStatus('loading');
      try {
        const data = await fetchDescargables(tipoActivo ? { tipo: tipoActivo } : {});
        setItems(data);
        setStatus('ready');
      } catch (error) {
        setStatus('error');
      }
    };

    load();
  }, [tipoActivo]);

  return (
    <main className="page">
      <div className="page__heading">
        <h1>Descargables</h1>
        <p>
          Guías, ensayos, formularios y material oficial del DEMRE, todo en
          un solo lugar.
        </p>
      </div>

      <div className="filter-bar" role="group" aria-label="Filtrar por tipo">
        {tipos.map((tipo) => (
          <button
            key={tipo.value || 'todos'}
            type="button"
            className={`filter-chip ${tipoActivo === tipo.value ? 'filter-chip--active' : ''}`}
            onClick={() => setTipoActivo(tipo.value)}
          >
            {tipo.label}
          </button>
        ))}
      </div>

      {status === 'loading' && <p className="state-message">Cargando descargables…</p>}

      {status === 'error' && (
        <p className="state-message state-message--error">
          No se pudieron cargar los descargables. Verifica que el backend
          esté corriendo.
        </p>
      )}

      {status === 'ready' && items.length === 0 && (
        <p className="state-message">No hay descargables de este tipo todavía.</p>
      )}

      {status === 'ready' && items.length > 0 && (
        <div className="download-grid">
          {items.map((item) => (
            <article key={item.id} className="download-card">
              <span className="download-card__type">{tipoLabel[item.tipo]}</span>
              <h3>{item.titulo}</h3>
              {item.materia_nombre && (
                <span className="download-card__subject">{item.materia_nombre}</span>
              )}
              {item.descripcion && <p>{item.descripcion}</p>}
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="button button--ghost"
              >
                Ver documento oficial ↗
              </a>
              <span className="download-card__source">Fuente: {item.fuente}</span>
            </article>
          ))}
        </div>
      )}
    </main>
  );
};

export default Descargables;
