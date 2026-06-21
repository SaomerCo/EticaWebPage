import { Link, useParams } from 'react-router-dom';
import { subjects } from '../data/subjects.js';

const MateriaDetail = () => {
  const { id } = useParams();
  const subject = subjects.find((item) => item.id === id);

  if (!subject) {
    return (
      <main className="page">
        <h1>Materia no encontrada</h1>
        <p>No existe una materia con ese identificador.</p>
        <Link to="/materias" className="button button--ghost">
          Volver a materias
        </Link>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="page__heading">
        <span
          className="subject-card__dot"
          style={{ backgroundColor: subject.accent }}
          aria-hidden="true"
        />
        <h1>{subject.name}</h1>
        <p>{subject.short}</p>
      </div>

      <div className="placeholder-card">
        <p>
          Las unidades, contenidos, fórmulas, resúmenes, ejercicios y PDFs
          descargables de esta materia se implementan en la <strong>Fase 3</strong>,
          cuando definamos el modelo de datos completo en PostgreSQL.
        </p>
        <Link to="/materias" className="button button--ghost">
          Volver a materias
        </Link>
      </div>
    </main>
  );
};

export default MateriaDetail;
