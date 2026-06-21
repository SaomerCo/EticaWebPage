import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchMateriaDetail } from '../services/api.js';
import ExerciseCard from '../components/ExerciseCard.jsx';

const MateriaDetail = () => {
  const { id: slug } = useParams();
  const [status, setStatus] = useState('loading');
  const [materia, setMateria] = useState(null);

  // Se vuelve a ejecutar cada vez que cambia el slug de la URL: si el
  // usuario navega de /materias/matematica-m1 a /materias/ciencias sin
  // pasar por otra página, React Router reutiliza el mismo componente,
  // así que sin "[slug]" como dependencia el efecto no se repetiría y
  // seguirías viendo los datos de la materia anterior.
  useEffect(() => {
    const load = async () => {
      setStatus('loading');
      try {
        const data = await fetchMateriaDetail(slug);
        setMateria(data);
        setStatus('ready');
      } catch (error) {
        setStatus(error.message === 'not-found' ? 'not-found' : 'error');
      }
    };

    load();
  }, [slug]);

  if (status === 'loading') {
    return (
      <main className="page">
        <p className="state-message">Cargando materia…</p>
      </main>
    );
  }

  if (status === 'not-found') {
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

  if (status === 'error') {
    return (
      <main className="page">
        <p className="state-message state-message--error">
          No se pudo cargar la materia. Verifica que el backend esté
          corriendo.
        </p>
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
          style={{ backgroundColor: materia.color_accent }}
          aria-hidden="true"
        />
        <h1>{materia.nombre}</h1>
        <p>{materia.descripcion}</p>
      </div>

      {materia.unidades.map((unidad) => (
        <section key={unidad.id} className="unit-block">
          <h2>{unidad.nombre}</h2>
          {unidad.descripcion && <p className="unit-block__desc">{unidad.descripcion}</p>}

          {unidad.contenidos.length > 0 && (
            <div className="unit-block__group">
              <h3>Contenidos</h3>
              {unidad.contenidos.map((contenido) => (
                <article key={contenido.id} className="content-card">
                  <h4>{contenido.titulo}</h4>
                  <p>{contenido.cuerpo}</p>
                </article>
              ))}
            </div>
          )}

          {unidad.formulas.length > 0 && (
            <div className="unit-block__group">
              <h3>Fórmulas y resúmenes</h3>
              <div className="formula-grid">
                {unidad.formulas.map((formula) => (
                  <article key={formula.id} className="formula-card">
                    <h4>{formula.titulo}</h4>
                    <p className="formula-card__expression">{formula.expresion}</p>
                    {formula.explicacion && <p>{formula.explicacion}</p>}
                  </article>
                ))}
              </div>
            </div>
          )}

          {unidad.ejercicios.length > 0 && (
            <div className="unit-block__group">
              <h3>Ejercicios</h3>
              {unidad.ejercicios.map((ejercicio) => (
                <ExerciseCard key={ejercicio.id} exercise={ejercicio} />
              ))}
            </div>
          )}
        </section>
      ))}

      <div className="placeholder-card">
        <p>
          Los PDFs descargables de esta materia (guías, ensayos,
          formularios) se implementan en la <strong>Fase 4</strong>.
        </p>
        <Link to="/materias" className="button button--ghost">
          Volver a materias
        </Link>
      </div>
    </main>
  );
};

export default MateriaDetail;
