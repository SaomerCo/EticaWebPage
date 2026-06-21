import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

// React Router v6 permite definir un "layout route": este componente
// envuelve a TODAS las páginas con Navbar y Footer, y <Outlet /> es el
// punto donde se inserta la página específica de cada ruta. Así evitamos
// repetir <Navbar /> y <Footer /> en Home, Materias, Calendario, etc.
const Layout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

export default Layout;
