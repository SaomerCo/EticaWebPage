import { Link } from 'react-router-dom';

const SubjectCard = ({ subject }) => (
  <Link to={`/materias/${subject.id}`} className="subject-card">
    <span
      className="subject-card__dot"
      style={{ backgroundColor: subject.accent }}
      aria-hidden="true"
    />
    <h3>{subject.name}</h3>
    <p>{subject.short}</p>
    <span className="subject-card__link">Ver materia →</span>
  </Link>
);

export default SubjectCard;
