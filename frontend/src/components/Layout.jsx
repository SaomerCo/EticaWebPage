import { useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import ChatWidget from './ChatWidget.jsx';

// El estado "expandido / minimizado" del chat vive acá, un nivel por
// encima de las páginas, para que sobreviva la navegación entre
// rutas. Se comparte con las páginas hijas a través del "context" de
// React Router (la prop "context" de <Outlet>), que cualquier página
// puede leer con useOutletContext() sin necesidad de pasar props a
// mano por todos los niveles intermedios.
const Layout = () => {
  const [chatExpanded, setChatExpanded] = useState(false);

  // useCallback es CRÍTICO acá: sin él, esta función se recrea en
  // cada render de Layout (incluyendo el render que pasa cuando
  // minimizas el chat). Como Chat.jsx escucha cambios en "openChat"
  // con un useEffect, una función nueva en cada render dispara ese
  // efecto de nuevo — y el efecto vuelve a abrir el chat. El síntoma
  // exacto es "minimizar no hace nada, se vuelve a abrir solo".
  const openChat = useCallback(() => setChatExpanded(true), []);

  return (
    <>
      <Navbar />
      <Outlet context={{ openChat }} />
      <Footer />
      <ChatWidget
        expanded={chatExpanded}
        onExpand={() => setChatExpanded(true)}
        onMinimize={() => setChatExpanded(false)}
      />
    </>
  );
};

export default Layout;
