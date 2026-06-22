import { useEffect, useState } from 'react';
import { fetchCalendario } from '../services/api.js';

const formatFecha = (date) =>
  date.toLocaleDateString('es-CL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

const formatRango = (inicio, fin) => {
  if (!fin) return formatFecha(inicio);

  const mismoDia = inicio.toDateString() === fin.toDateString();
  if (mismoDia) return formatFecha(inicio);

  const inicioCorto = inicio.toLocaleDateString('es-CL', { day: 'numeric', month: 'long' });
  const finCompleto = formatFecha(fin);
  return `${inicioCorto} al ${finCompleto}`;
};

// Un evento se considera "vigente o próximo" si su fecha de término
// (o de inicio, si no tiene fecha de término) todavía no pasó. Se usa
// solo para la etiqueta visual; el filtrado real de "próximos" para
// la cuenta regresiva y el teaser del Home se hace en el backend.
const estaVigenteOProximo = (evento) => {
  const referencia = evento.fecha_fin ? new Date(evento.fecha_fin) : new Date(evento.fecha_inicio);
  return referencia.getTime() >= Date.now();
};

const Calendario = () => {
  const [status, setStatus] = useState('loading');
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchCalendario();
        setEventos(data);
        setStatus('ready');
      } catch (error) {
        setStatus('error');
      }
    };

    load();
  }, []);

  return (
    <main className="page">
      <div className="page__heading">
        <h1>Calendario PAES</h1>
        <p>Fechas oficiales del Proceso de Admisión 2027, según el DEMRE.</p>
      </div>

      {status === 'loading' && <p className="state-message">Cargando calendario…</p>}

      {status === 'error' && (
        <p className="state-message state-message--error">
          No se pudo cargar el calendario. Verifica que el backend esté
          corriendo.
        </p>
      )}

      {status === 'ready' && (
        <ul className="date-list date-list--full">
          {eventos.map((evento) => {
            const vigente = estaVigenteOProximo(evento);
            return (
              <li key={evento.id}>
                <span className="date-list__date">
                  {formatRango(new Date(evento.fecha_inicio), evento.fecha_fin ? new Date(evento.fecha_fin) : null)}
                </span>
                <div>
                  <div className="date-list__title-row">
                    <p className="date-list__title">{evento.titulo}</p>
                    <span className={`status-badge ${vigente ? 'status-badge--upcoming' : 'status-badge--past'}`}>
                      {vigente ? 'Vigente o próximo' : 'Finalizado'}
                    </span>
                  </div>
                  <p className="date-list__desc">{evento.descripcion}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <div className="placeholder-card">
        <p>
          Fuente: DEMRE. Las fechas pueden estar sujetas a cambios
          oficiales; ante cualquier duda, verifica siempre en{' '}
          <a href="https://demre.cl" target="_blank" rel="noopener noreferrer">
            demre.cl
          </a>
          .
        </p>
      </div>
    </main>
  );
};

export default Calendario;
