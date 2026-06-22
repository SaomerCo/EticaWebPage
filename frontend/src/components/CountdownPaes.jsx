import { useEffect, useState } from 'react';
import { fetchCalendario } from '../services/api.js';

const ONE_SECOND = 1000;

const getTimeLeft = (fechaRendicion) => {
  const diff = fechaRendicion.getTime() - Date.now();

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
  const [status, setStatus] = useState('loading');
  const [fechaRendicion, setFechaRendicion] = useState(null);
  const [fechaFinRendicion, setFechaFinRendicion] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  // Pide al backend el evento de tipo "rendicion" (en vez de tener la
  // fecha fija en el frontend). Como solo nos interesa la fecha, no el
  // listado completo, filtramos directamente en la API con ?tipo=.
  useEffect(() => {
    const load = async () => {
      try {
        const eventos = await fetchCalendario({ tipo: 'rendicion' });
        const evento = eventos[0];

        if (!evento) {
          setStatus('error');
          return;
        }

        setFechaRendicion(new Date(evento.fecha_inicio));
        setFechaFinRendicion(evento.fecha_fin ? new Date(evento.fecha_fin) : null);
        setStatus('ready');
      } catch (error) {
        setStatus('error');
      }
    };

    load();
  }, []);

  // El intervalo de 1 segundo solo arranca una vez que ya sabemos la
  // fecha objetivo (no antes), y se limpia al desmontar el componente
  // para no dejar un temporizador corriendo en el vacío.
  useEffect(() => {
    if (!fechaRendicion) return undefined;

    setTimeLeft(getTimeLeft(fechaRendicion));
    const interval = setInterval(() => setTimeLeft(getTimeLeft(fechaRendicion)), ONE_SECOND);
    return () => clearInterval(interval);
  }, [fechaRendicion]);

  if (status === 'loading') {
    return (
      <div className="countdown">
        <span className="countdown__title">Cargando cuenta regresiva…</span>
      </div>
    );
  }

  if (status === 'error' || !timeLeft) {
    return (
      <div className="countdown">
        <span className="countdown__title">No se pudo cargar la fecha de la PAES.</span>
      </div>
    );
  }

  if (timeLeft.finalizado) {
    return (
      <div className="countdown countdown--done">
        <p>La rendición de la PAES Regular ya comenzó. ¡Mucho éxito!</p>
      </div>
    );
  }

  const fechaLabel = fechaFinRendicion
    ? `${fechaRendicion.toLocaleDateString('es-CL', { day: 'numeric', month: 'short' })} – ${fechaFinRendicion.toLocaleDateString('es-CL', { day: 'numeric', month: 'short', year: 'numeric' })}`
    : fechaRendicion.toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="countdown">
      <span className="countdown__title">Faltan para la PAES Regular</span>
      <div className="countdown__units">
        <Bubble value={timeLeft.dias} label="días" />
        <Bubble value={timeLeft.horas} label="hrs" />
        <Bubble value={timeLeft.minutos} label="min" />
        <Bubble value={timeLeft.segundos} label="seg" />
      </div>
      <span className="countdown__date">{fechaLabel}</span>
    </div>
  );
};

export default CountdownPaes;
