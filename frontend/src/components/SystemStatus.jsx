import { useEffect, useState } from 'react';
import { checkBackendHealth } from '../services/api.js';

// Este componente reemplaza la tarjeta grande de la Fase 1. La verificación
// de conexión sigue existiendo (nos sirve para detectar errores de
// configuración rápido), pero ya no es el centro de la página: ahora es
// un indicador discreto, apropiado para una página que un estudiante
// real va a visitar.
const SystemStatus = () => {
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        await checkBackendHealth();
        setStatus('connected');
      } catch (error) {
        setStatus('error');
      }
    };

    fetchHealth();
  }, []);

  const label = {
    loading: 'Verificando servidor…',
    connected: 'Servidor y base de datos operativos',
    error: 'Sin conexión con el servidor',
  }[status];

  return (
    <div className={`system-status system-status--${status}`} role="status">
      <span className="system-status__dot" aria-hidden="true" />
      {label}
    </div>
  );
};

export default SystemStatus;
