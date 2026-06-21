import { subjects } from '../data/subjects.js';
import SubjectCard from '../components/SubjectCard.jsx';

const Materias = () => (
  <main className="page">
    <div className="page__heading">
      <h1>Materias</h1>
      <p>
        Selecciona una materia para ver sus unidades, contenidos, fórmulas,
        resúmenes y ejercicios.
      </p>
    </div>
    <div className="subject-grid">
      {subjects.map((subject) => (
        <SubjectCard key={subject.id} subject={subject} />
      ))}
    </div>
  </main>
);

export default Materias;
