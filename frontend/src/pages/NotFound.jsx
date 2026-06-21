import { Link } from 'react-router-dom';

const NotFound = () => (
  <main className="page page--narrow page--center">
    <h1>404</h1>
    <p>Esta página no existe.</p>
    <Link to="/" className="button button--primary">
      Volver al inicio
    </Link>
  </main>
);

export default NotFound;
