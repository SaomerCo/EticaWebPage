import { useEffect, useState } from 'react';
import { fetchMaterias } from '../services/api.js';
import SubjectCard from '../components/SubjectCard.jsx';

const Materias = () => {
  const [status, setStatus] = useState('loading');
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchMaterias();
        setSubjects(data);
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
        <h1>Materias</h1>
        <p>
          Selecciona una materia para ver sus unidades, contenidos, fórmulas,
          resúmenes y ejercicios.
        </p>
      </div>

      {status === 'loading' && <p className="state-message">Cargando materias…</p>}

      {status === 'error' && (
        <p className="state-message state-message--error">
          No se pudieron cargar las materias. Verifica que el backend esté
          corriendo y que la base de datos tenga los datos cargados
          (database/schema.sql y database/seed.sql).
        </p>
      )}

      {status === 'ready' && (
        <div className="subject-grid">
          {subjects.map((subject) => (
            <SubjectCard key={subject.slug} subject={subject} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Materias;
