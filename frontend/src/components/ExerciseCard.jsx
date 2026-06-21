import { useState } from 'react';

const dificultadLabel = {
  baja: 'Dificultad baja',
  media: 'Dificultad media',
  alta: 'Dificultad alta',
};

// Estado local simple: cada tarjeta de ejercicio controla su propio
// "¿se reveló la respuesta?" sin necesidad de levantar ese estado al
// componente padre. Es exactamente el tipo de estado que NO debería
// vivir más arriba: a ninguna otra parte de la página le importa si
// este ejercicio en particular está revelado o no.
const ExerciseCard = ({ exercise }) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="exercise-card">
      <div className="exercise-card__header">
        <span className="exercise-card__difficulty">
          {dificultadLabel[exercise.dificultad] || 'Dificultad media'}
        </span>
      </div>

      <p className="exercise-card__statement">{exercise.enunciado}</p>

      <ul className="exercise-card__options">
        {exercise.alternativas.map((alternativa) => {
          const isCorrect = revealed && alternativa.letra === exercise.respuesta_correcta;
          return (
            <li
              key={alternativa.letra}
              className={`exercise-card__option ${isCorrect ? 'exercise-card__option--correct' : ''}`}
            >
              <strong>{alternativa.letra})</strong> {alternativa.texto}
            </li>
          );
        })}
      </ul>

      {revealed ? (
        <div className="exercise-card__explanation">
          <p>
            <strong>Respuesta correcta: {exercise.respuesta_correcta}.</strong>{' '}
            {exercise.explicacion}
          </p>
        </div>
      ) : (
        <button
          type="button"
          className="button button--ghost"
          onClick={() => setRevealed(true)}
        >
          Ver respuesta y explicación
        </button>
      )}
    </div>
  );
};

export default ExerciseCard;
