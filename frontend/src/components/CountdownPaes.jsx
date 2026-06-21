import { useEffect, useState } from 'react';
import { paesDates } from '../data/paesDates.js';

const ONE_SECOND = 1000;

const getTimeLeft = () => {
  const diff = paesDates.rendicionDia1.getTime() - Date.now();

  if (diff <= 0) {
    return { dias: 0, horas: 0, minutos: 0, segundos: 0, finalizado: true };
  }

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diff / (1000 * 60)) % 60);
  const segundos = Math.floor((diff / 1000) % 60);

  return { dias, horas, minutos, segundos, finalizado: false };
};

// Cada unidad de tiempo se muestra dentro de una "burbuja" circular,
// el mismo lenguaje visual de las hojas de respuesta de la PAES.
// No es un adorno: es el recurso visual más reconocible del propio
// examen, reutilizado para algo que el estudiante realmente necesita
// saber (cuánto tiempo le queda).
const Bubble = ({ value, label }) => (
  <div className="countdown__unit">
    <div className="countdown__bubble">{String(value).padStart(2, '0')}</div>
    <span className="countdown__label">{label}</span>
  </div>
);

const CountdownPaes = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), ONE_SECOND);
    return () => clearInterval(interval);
  }, []);

  if (timeLeft.finalizado) {
    return (
      <div className="countdown countdown--done">
        <p>La rendición de la PAES Regular 2026 ya comenzó. ¡Mucho éxito!</p>
      </div>
    );
  }

  return (
    <div className="countdown">
      <span className="countdown__title">Faltan para la PAES Regular</span>
      <div className="countdown__units">
        <Bubble value={timeLeft.dias} label="días" />
        <Bubble value={timeLeft.horas} label="hrs" />
        <Bubble value={timeLeft.minutos} label="min" />
        <Bubble value={timeLeft.segundos} label="seg" />
      </div>
      <span className="countdown__date">30 nov · 1 y 2 dic 2026</span>
    </div>
  );
};

export default CountdownPaes;
