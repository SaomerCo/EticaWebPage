import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import MathText from '../components/MathText.jsx';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const DIFICULTADES = [
  { value: 'mixto', label: 'Mixto (todas)' },
  { value: 'baja', label: 'Fácil' },
  { value: 'media', label: 'Medio' },
  { value: 'alta', label: 'Difícil' },
];

const TIEMPOS = [
  { value: 0, label: 'Sin límite' },
  { value: 10, label: '10 minutos' },
  { value: 15, label: '15 minutos' },
  { value: 20, label: '20 minutos' },
  { value: 30, label: '30 minutos' },
];

const LETRAS = ['A', 'B', 'C', 'D'];

// ============================================================
// PANTALLA 1: Configuración del cuestionario
// ============================================================
const PantallaConfig = ({ slug, onIniciar }) => {
  const [disponibles, setDisponibles] = useState(null);
  const [dificultad, setDificultad] = useState('mixto');
  const [cantidad, setCantidad] = useState(10);
  const [tiempoMin, setTiempoMin] = useState(15);
  const [loading, setLoading] = useState(false);

  // Consulta al backend cuántas preguntas hay disponibles para esta
  // combinación de materia + dificultad, para limitar el slider.
  useEffect(() => {
    const fetchDisponibles = async () => {
      try {
        const params = new URLSearchParams({ materia: slug });
        if (dificultad !== 'mixto') params.set('dificultad', dificultad);
        const res = await fetch(`${API_URL}/ejercicios/disponibles?${params}`);
        const data = await res.json();
        setDisponibles(data.disponibles);
        setCantidad((prev) => Math.min(prev, data.disponibles, 20));
      } catch {
        setDisponibles(null);
      }
    };
    fetchDisponibles();
  }, [slug, dificultad]);

  const maxCantidad = Math.min(disponibles ?? 20, 20);

  const handleIniciar = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ materia: slug, dificultad, cantidad });
      const res = await fetch(`${API_URL}/ejercicios/quiz?${params}`);
      const preguntas = await res.json();
      onIniciar(preguntas, tiempoMin * 60);
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="quiz-config">
      <h1>Configurar cuestionario</h1>
      <p>Elige cómo quieres practicar y el sistema te dará preguntas distintas cada vez.</p>

      <div className="quiz-config__field">
        <label>Dificultad</label>
        <div className="quiz-config__options">
          {DIFICULTADES.map((d) => (
            <button
              key={d.value}
              type="button"
              className={`filter-chip ${dificultad === d.value ? 'filter-chip--active' : ''}`}
              onClick={() => setDificultad(d.value)}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className="quiz-config__field">
        <label>
          Cantidad de preguntas: <strong>{cantidad}</strong>
          {disponibles !== null && (
            <span className="quiz-config__hint"> (máximo disponible: {Math.min(disponibles, 20)})</span>
          )}
        </label>
        <input
          type="range"
          min="5"
          max={maxCantidad}
          value={cantidad}
          onChange={(e) => setCantidad(Number(e.target.value))}
          disabled={maxCantidad < 5}
        />
        <div className="quiz-config__range-labels">
          <span>5</span>
          <span>{maxCantidad}</span>
        </div>
      </div>

      <div className="quiz-config__field">
        <label>Tiempo límite</label>
        <div className="quiz-config__options">
          {TIEMPOS.map((t) => (
            <button
              key={t.value}
              type="button"
              className={`filter-chip ${tiempoMin === t.value ? 'filter-chip--active' : ''}`}
              onClick={() => setTiempoMin(t.value)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="button button--primary"
        onClick={handleIniciar}
        disabled={loading || !disponibles || disponibles < 5}
      >
        {loading ? 'Cargando preguntas…' : 'Empezar cuestionario'}
      </button>

      {disponibles !== null && disponibles < 5 && (
        <p className="state-message state-message--error">
          No hay suficientes preguntas de esta dificultad. Prueba con "Mixto".
        </p>
      )}
    </div>
  );
};

// ============================================================
// PANTALLA 2: Pregunta activa (una a la vez)
// ============================================================
const PantallaJugando = ({ preguntas, tiempoTotal, onTerminar }) => {
  const [indice, setIndice] = useState(0);
  const [seleccionada, setSeleccionada] = useState(null);
  const [mostrarFeedback, setMostrarFeedback] = useState(false);
  const [respuestas, setRespuestas] = useState([]);
  const [segundosRestantes, setSegundosRestantes] = useState(tiempoTotal);
  const intervalRef = useRef(null);

  const terminarQuiz = useCallback((respuestasFinales) => {
    clearInterval(intervalRef.current);
    onTerminar(respuestasFinales);
  }, [onTerminar]);

  // Temporizador: solo si el usuario eligió un tiempo límite.
  // Al llegar a 0, el quiz termina con las respuestas que haya hasta
  // ese momento (incluyendo la pregunta activa si ya seleccionó algo).
  useEffect(() => {
    if (tiempoTotal === 0) return undefined;

    intervalRef.current = setInterval(() => {
      setSegundosRestantes((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          // Usar un callback para acceder al estado actualizado
          setRespuestas((r) => {
            terminarQuiz(r);
            return r;
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [tiempoTotal, terminarQuiz]);

  const pregunta = preguntas[indice];
  const esCorrecta = seleccionada === pregunta.respuesta_correcta;

  const handleSeleccionar = (letra) => {
    if (mostrarFeedback) return;
    setSeleccionada(letra);
    setMostrarFeedback(true);
  };

  const handleSiguiente = () => {
    const nuevasRespuestas = [
      ...respuestas,
      {
        pregunta,
        seleccionada,
        correcta: seleccionada === pregunta.respuesta_correcta,
      },
    ];

    if (indice + 1 >= preguntas.length) {
      terminarQuiz(nuevasRespuestas);
    } else {
      setRespuestas(nuevasRespuestas);
      setIndice(indice + 1);
      setSeleccionada(null);
      setMostrarFeedback(false);
    }
  };

  const minutos = Math.floor(segundosRestantes / 60);
  const segundos = segundosRestantes % 60;
  const tiempoAgotandose = tiempoTotal > 0 && segundosRestantes < 60;

  return (
    <div className="quiz-playing">
      <header className="quiz-playing__header">
        <span className="quiz-playing__progress">
          Pregunta {indice + 1} de {preguntas.length}
        </span>
        <div className="quiz-playing__progress-bar">
          <div
            className="quiz-playing__progress-fill"
            style={{ width: `${((indice) / preguntas.length) * 100}%` }}
          />
        </div>
        {tiempoTotal > 0 && (
          <span className={`quiz-playing__timer ${tiempoAgotandose ? 'quiz-playing__timer--urgente' : ''}`}>
            {String(minutos).padStart(2, '0')}:{String(segundos).padStart(2, '0')}
          </span>
        )}
      </header>

      <div className="quiz-playing__question">
        <span className="quiz-playing__difficulty">{pregunta.dificultad}</span>
        <p className="quiz-playing__enunciado">
          <MathText text={pregunta.enunciado} />
        </p>

        <div className="quiz-playing__alternatives">
          {pregunta.alternativas.map((alt) => {
            let clase = 'quiz-alt';
            if (mostrarFeedback) {
              if (alt.letra === pregunta.respuesta_correcta) clase += ' quiz-alt--correcta';
              else if (alt.letra === seleccionada) clase += ' quiz-alt--incorrecta';
            } else if (alt.letra === seleccionada) {
              clase += ' quiz-alt--seleccionada';
            }

            return (
              <button
                key={alt.letra}
                type="button"
                className={clase}
                onClick={() => handleSeleccionar(alt.letra)}
                disabled={mostrarFeedback}
              >
                <span className="quiz-alt__letra">{alt.letra}</span>
                <span><MathText text={alt.texto} /></span>
              </button>
            );
          })}
        </div>

        {mostrarFeedback && (
          <div className={`quiz-feedback ${esCorrecta ? 'quiz-feedback--ok' : 'quiz-feedback--error'}`}>
            <strong>{esCorrecta ? '¡Correcto!' : `Incorrecto — la respuesta era ${pregunta.respuesta_correcta}`}</strong>
            <p><MathText text={pregunta.explicacion} /></p>
          </div>
        )}
      </div>

      {mostrarFeedback && (
        <button type="button" className="button button--primary" onClick={handleSiguiente}>
          {indice + 1 >= preguntas.length ? 'Ver resultados' : 'Siguiente pregunta →'}
        </button>
      )}
    </div>
  );
};

// ============================================================
// PANTALLA 3: Resumen de resultados
// ============================================================
const PantallaResultados = ({ respuestas, slug }) => {
  const correctas = respuestas.filter((r) => r.correcta).length;
  const total = respuestas.length;
  const porcentaje = Math.round((correctas / total) * 100);
  const errores = respuestas.filter((r) => !r.correcta);

  // Agrupa los errores por unidad para las recomendaciones.
  const unidadesConErrores = [...new Set(errores.map((e) => e.pregunta.unidad))];

  let mensaje;
  if (porcentaje >= 80) mensaje = '¡Excelente resultado! Estás muy bien preparado en este tema.';
  else if (porcentaje >= 60) mensaje = 'Buen trabajo. Repasa los temas donde cometiste errores y vuelve a intentarlo.';
  else mensaje = 'Sigue practicando. Con constancia vas a mejorar. Enfócate en las unidades recomendadas abajo.';

  return (
    <div className="quiz-results">
      <div className="quiz-results__score">
        <span className="quiz-results__number">{correctas}/{total}</span>
        <span className="quiz-results__label">respuestas correctas ({porcentaje}%)</span>
        <p>{mensaje}</p>
      </div>

      {unidadesConErrores.length > 0 && (
        <section className="quiz-results__recommendations">
          <h2>Te recomendamos repasar</h2>
          <ul>
            {unidadesConErrores.map((unidad) => (
              <li key={unidad}>{unidad}</li>
            ))}
          </ul>
        </section>
      )}

      {errores.length > 0 && (
        <section className="quiz-results__errors">
          <h2>Preguntas que fallaste</h2>
          {errores.map((error, i) => (
            <article key={i} className="quiz-results__error-item">
              <p className="quiz-results__error-q">
                <MathText text={error.pregunta.enunciado} />
              </p>
              <p className="quiz-results__error-tu">
                Tu respuesta: <strong className="color-error">{error.seleccionada}</strong>
                {' — '}
                Correcta: <strong className="color-success">{error.pregunta.respuesta_correcta}</strong>
              </p>
              <p className="quiz-results__error-exp">
                <MathText text={error.pregunta.explicacion} />
              </p>
            </article>
          ))}
        </section>
      )}

      <div className="page__actions">
        <Link to={`/materias/${slug}`} className="button button--ghost">
          Volver a la materia
        </Link>
        <Link to={`/cuestionario?materia=${slug}`} className="button button--primary"
          onClick={() => window.location.reload()}>
          Hacer otro cuestionario
        </Link>
      </div>
    </div>
  );
};

// ============================================================
// Componente raíz: orquesta las tres pantallas
// ============================================================
const Cuestionario = () => {
  const [searchParams] = useSearchParams();
  const slug = searchParams.get('materia');

  const [fase, setFase] = useState('config'); // config | jugando | resultados
  const [preguntas, setPreguntas] = useState([]);
  const [tiempoTotal, setTiempoTotal] = useState(0);
  const [respuestas, setRespuestas] = useState([]);

  if (!slug) {
    return (
      <main className="page page--narrow">
        <h1>Cuestionario</h1>
        <p>No se especificó ninguna materia. Elige una desde la sección de Materias.</p>
        <Link to="/materias" className="button button--ghost">Ir a Materias</Link>
      </main>
    );
  }

  const handleIniciar = (preguntasCargadas, segundos) => {
    setPreguntas(preguntasCargadas);
    setTiempoTotal(segundos);
    setFase('jugando');
  };

  const handleTerminar = (respuestasFinales) => {
    setRespuestas(respuestasFinales);
    setFase('resultados');
  };

  return (
    <main className="page page--narrow">
      {fase === 'config' && (
        <PantallaConfig slug={slug} onIniciar={handleIniciar} />
      )}
      {fase === 'jugando' && (
        <PantallaJugando
          preguntas={preguntas}
          tiempoTotal={tiempoTotal}
          onTerminar={handleTerminar}
        />
      )}
      {fase === 'resultados' && (
        <PantallaResultados respuestas={respuestas} slug={slug} />
      )}
    </main>
  );
};

export default Cuestionario;
