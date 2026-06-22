import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchMaterias, fetchCalendario } from '../services/api.js';
import CountdownPaes from '../components/CountdownPaes.jsx';
import SubjectCard from '../components/SubjectCard.jsx';
import SystemStatus from '../components/SystemStatus.jsx';

const formatFecha = (date) =>
  date.toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' });

const Home = () => {
  const [subjectsStatus, setSubjectsStatus] = useState('loading');
  const [subjects, setSubjects] = useState([]);
  const [eventsStatus, setEventsStatus] = useState('loading');
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const loadSubjects = async () => {
      try {
        const data = await fetchMaterias();
        setSubjects(data);
        setSubjectsStatus('ready');
      } catch (error) {
        setSubjectsStatus('error');
      }
    };

    const loadEventos = async () => {
      try {
        // Los 3 eventos vigentes o próximos más cercanos, calculados
        // por el propio backend (ver calendario.controller.js).
        const data = await fetchCalendario({ proximos: 3 });
        setEventos(data);
        setEventsStatus('ready');
      } catch (error) {
        setEventsStatus('error');
      }
    };

    loadSubjects();
    loadEventos();
  }, []);

  return (
    <main>
      <section className="hero">
        <div className="hero__copy">
          <span className="hero__pill">Inscripción PAES Regular abierta hasta el 22 de julio</span>
          <h1>
            Prepara tu PAES con todo el material oficial, <span>en un solo lugar</span>.
          </h1>
          <p>
            PAES Mentor centraliza guías, ensayos y formularios oficiales, y te
            conecta con un mentor de IA que solo responde sobre la PAES: nada
            de respuestas genéricas, nada fuera de lo que realmente te van a
            preguntar.
          </p>
          <div className="hero__actions">
            <Link to="/materias" className="button button--primary">
              Ver materias
            </Link>
            <Link to="/chat" className="button button--ghost">
              Hablar con el Mentor IA
            </Link>
          </div>
        </div>

        <CountdownPaes />
      </section>

      <section className="section">
        <div className="section__heading">
          <h2>Materias</h2>
          <p>Las cinco pruebas del proceso de admisión, organizadas por unidad.</p>
        </div>

        {subjectsStatus === 'loading' && <p className="state-message">Cargando materias…</p>}
        {subjectsStatus === 'error' && (
          <p className="state-message state-message--error">
            No se pudieron cargar las materias. Verifica que el backend esté corriendo.
          </p>
        )}
        {subjectsStatus === 'ready' && (
          <div className="subject-grid">
            {subjects.map((subject) => (
              <SubjectCard key={subject.slug} subject={subject} />
            ))}
          </div>
        )}
      </section>

      <section className="section section--split">
        <div>
          <span className="section__eyebrow">Mentor IA</span>
          <h2>Una IA que solo sabe de PAES</h2>
          <p>
            El chat está construido sobre un sistema RAG que consulta
            exclusivamente documentos oficiales: temarios, formularios y
            ensayos del DEMRE. Si le preguntas algo fuera de la PAES, te lo va
            a decir directamente en vez de inventar una respuesta.
          </p>
          <Link to="/chat" className="button button--primary">
            Probar el chat
          </Link>
        </div>
        <ul className="feature-list">
          <li>Ejercicios resueltos paso a paso, no solo el resultado final.</li>
          <li>Fórmulas y resúmenes oficiales de Matemática M1 y M2.</li>
          <li>Fechas de inscripción y rendición siempre actualizadas.</li>
          <li>Estrategias de estudio enfocadas en el tiempo que te queda.</li>
        </ul>
      </section>

      <section className="section">
        <div className="section__heading">
          <h2>Próximas fechas clave</h2>
          <p>Calendario oficial del Proceso de Admisión 2027 (DEMRE).</p>
        </div>

        {eventsStatus === 'loading' && <p className="state-message">Cargando fechas…</p>}
        {eventsStatus === 'error' && (
          <p className="state-message state-message--error">
            No se pudieron cargar las fechas. Verifica que el backend esté corriendo.
          </p>
        )}
        {eventsStatus === 'ready' && (
          <ul className="date-list">
            {eventos.map((evento) => (
              <li key={evento.id}>
                <span className="date-list__date">{formatFecha(new Date(evento.fecha_inicio))}</span>
                <div>
                  <p className="date-list__title">{evento.titulo}</p>
                  <p className="date-list__desc">{evento.descripcion}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
        <Link to="/calendario" className="button button--ghost">
          Ver calendario completo
        </Link>
      </section>

      <SystemStatus />
    </main>
  );
};

export default Home;
