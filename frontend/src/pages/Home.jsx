import { useEffect, useState } from 'react';
import { checkBackendHealth } from '../services/api.js';

// Estado de carga explícito en 3 valores (loading / connected / error)
// en vez de booleanos sueltos (isLoading, hasError...). Es más fácil de
// leer y evita estados imposibles, como "cargando" y "con error" a la vez.
const Home = () => {
  const [status, setStatus] = useState('loading');
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const data = await checkBackendHealth();
        setInfo(data);
        setStatus('connected');
      } catch (error) {
        setStatus('error');
      }
    };

    fetchHealth();
  }, []);

  return (
    <main className="home">
      <header className="home__hero">
        <span className="home__eyebrow">Preparación PAES · Chile</span>
        <h1>PAES Mentor</h1>
        <p>
          Plataforma gratuita que centraliza material oficial de la PAES y
          ofrece una IA educativa especializada en tu preparación.
        </p>
      </header>

      <section className="status-card" aria-live="polite">
        {status === 'loading' && (
          <p className="status status--loading">Verificando conexión con el servidor...</p>
        )}

        {status === 'connected' && (
          <>
            <p className="status status--ok">Backend conectado correctamente</p>
            <dl className="status-card__details">
              <div>
                <dt>Base de datos</dt>
                <dd>{info.database}</dd>
              </div>
              <div>
                <dt>Hora del servidor</dt>
                <dd>{new Date(info.serverTime).toLocaleString('es-CL')}</dd>
              </div>
            </dl>
          </>
        )}

        {status === 'error' && (
          <p className="status status--error">
            No se pudo conectar con el backend. Verifica que el servidor esté
            corriendo en el puerto 4000.
          </p>
        )}
      </section>
    </main>
  );
};

export default Home;
