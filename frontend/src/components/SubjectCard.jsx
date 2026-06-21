import { Link } from 'react-router-dom';

// Recibe una materia tal como la devuelve la API:
// { slug, nombre, descripcion, color_accent, unidades_count }
const SubjectCard = ({ subject }) => (
  <Link to={`/materias/${subject.slug}`} className="subject-card">
    <span
      className="subject-card__dot"
      style={{ backgroundColor: subject.color_accent }}
      aria-hidden="true"
    />
    <h3>{subject.nombre}</h3>
    <p>{subject.descripcion}</p>
    <div className="subject-card__footer">
      <span className="subject-card__count">{subject.unidades_count} unidades</span>
      <span className="subject-card__link">Ver materia →</span>
    </div>
  </Link>
);

export default SubjectCard;
