import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

// La interfaz real del chat vive en components/ChatWidget.jsx, montada
// en Layout para persistir entre rutas. Esta página solo le pide al
// widget que se expanda apenas alguien visita /chat directamente (por
// ejemplo, si comparten el link). Si por alguna razón el chat sigue
// minimizado, este texto queda como respaldo visible.
const Chat = () => {
  const { openChat } = useOutletContext();

  useEffect(() => {
    openChat();
  }, [openChat]);

  return (
    <main className="page page--narrow page--center">
      <h1>Mentor IA</h1>
      <p>
        Si no se abrió automáticamente, haz click en el botón "Mentor IA" en
        la esquina inferior derecha de la pantalla.
      </p>
    </main>
  );
};

export default Chat;
