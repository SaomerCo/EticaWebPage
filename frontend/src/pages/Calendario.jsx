import { proximasFechas } from '../data/paesDates.js';

const formatFecha = (date) =>
  date.toLocaleDateString('es-CL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

const Calendario = () => (
  <main className="page">
    <div className="page__heading">
      <h1>Calendario PAES</h1>
      <p>Fechas oficiales del Proceso de Admisión 2027, según el DEMRE.</p>
    </div>

    <ul className="date-list date-list--full">
      {proximasFechas.map((evento) => (
        <li key={evento.id}>
          <span className="date-list__date">{formatFecha(evento.fecha)}</span>
          <div>
            <p className="date-list__title">{evento.titulo}</p>
            <p className="date-list__desc">{evento.descripcion}</p>
          </div>
        </li>
      ))}
    </ul>

    <div className="placeholder-card">
      <p>
        Esta vista es preliminar. En la <strong>Fase 5</strong> el calendario
        completo (inscripción, locales de rendición por región, resultados y
        postulación) se servirá desde PostgreSQL en vez de estar fijo en el
        código del frontend.
      </p>
    </div>
  </main>
);

export default Calendario;
