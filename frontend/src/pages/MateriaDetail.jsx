import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchMateriaDetail } from '../services/api.js';
import MathText from '../components/MathText.jsx';

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

  // Un solo arreglo de "recursos" mezclando descargables (PDFs
  // oficiales) y páginas recomendadas (sitios externos), cada uno
  // marcado con su propio tipo para que la tarjeta lo distinga
  // visualmente. Es más simple para el usuario ver "todo lo que puedo
  // consultar" en un solo lugar que tener que mirar dos secciones
  // separadas para básicamente la misma pregunta ("¿dónde estudio
  // esto?").
  const recursos = [
    ...materia.descargables.map((item) => ({ ...item, categoria: 'descargable' })),
    ...materia.paginasRecomendadas.map((item) => ({ ...item, categoria: 'pagina' })),
  ];

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

      <section className="quiz-cta">
        <div>
          <span className="quiz-cta__eyebrow">Nuevo</span>
          <h2>Practica con un cuestionario</h2>
          <p>
            Elige cuántas preguntas quieres, la dificultad y si quieres tiempo
            límite. Cada vez son preguntas distintas. Al final ves qué fallaste
            y qué te conviene repasar.
          </p>
        </div>
        <Link
          to={`/cuestionario?materia=${materia.slug}`}
          className="button button--primary"
        >
          Configurar cuestionario
        </Link>
      </section>

      <section className="unit-block">
        <h2>Recursos para estudiar</h2>

        {recursos.length > 0 ? (
          <div className="download-grid">
            {recursos.map((item) => (
              <article key={`${item.categoria}-${item.id}`} className="download-card">
                <span className="download-card__type">
                  {item.categoria === 'descargable' ? item.tipo : 'Página recomendada'}
                </span>
                <h3>{item.titulo}</h3>
                {item.descripcion && <p>{item.descripcion}</p>}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button--ghost"
                >
                  {item.categoria === 'descargable' ? 'Ver documento oficial ↗' : 'Visitar sitio ↗'}
                </a>
                {item.fuente && <span className="download-card__source">Fuente: {item.fuente}</span>}
              </article>
            ))}
          </div>
        ) : (
          <div className="placeholder-card">
            <p>Todavía no hay recursos cargados para esta materia.</p>
          </div>
        )}
      </section>

      {materia.unidades.some((unidad) => unidad.formulas.length > 0) && (
        <section className="unit-block">
          <h2>Fórmulas y resúmenes rápidos</h2>
          {materia.unidades.map(
            (unidad) =>
              unidad.formulas.length > 0 && (
                <div key={unidad.id} className="unit-block__group">
                  <h3>{unidad.nombre}</h3>
                  <div className="formula-grid">
                    {unidad.formulas.map((formula) => (
                      <article key={formula.id} className="formula-card">
                        <h4>{formula.titulo}</h4>
                        <p className="formula-card__expression"><MathText text={formula.expresion} /></p>
                        {formula.explicacion && <p><MathText text={formula.explicacion} /></p>}
                      </article>
                    ))}
                  </div>
                </div>
              )
          )}
        </section>
      )}

      <div className="page__actions">
        <Link to="/materias" className="button button--ghost">
          Volver a materias
        </Link>
        <Link to="/descargables" className="button button--ghost">
          Ver todos los descargables
        </Link>
      </div>
    </main>
  );
};

export default MateriaDetail;
