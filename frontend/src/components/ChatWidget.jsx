import { useEffect, useRef, useState } from 'react';
import { sendChatMessage } from '../services/api.js';
import MathText from './MathText.jsx';

const MENSAJE_BIENVENIDA = {
  role: 'assistant',
  content:
    'Hola, soy tu Mentor PAES. Puedo ayudarte con contenido oficial, ejercicios paso a paso y fechas del proceso de admisión. ¿En qué te ayudo?',
};

// Este componente vive en Layout.jsx (no en una página), para que la
// conversación y el estado de "expandido/minimizado" sobrevivan a la
// navegación entre rutas: si minimizas el chat en /materias y vas a
// /calendario, la burbuja te sigue con la conversación intacta, en
// vez de perderse cada vez que cambias de página.
const ChatWidget = ({ expanded, onExpand, onMinimize }) => {
  const [messages, setMessages] = useState([MENSAJE_BIENVENIDA]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | error
  const [errorMsg, setErrorMsg] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (expanded) {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, status, expanded]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const texto = input.trim();
    if (!texto || status === 'sending') return;

    const historialActualizado = [...messages, { role: 'user', content: texto }];

    setMessages(historialActualizado);
    setInput('');
    setStatus('sending');
    setErrorMsg('');

    try {
      const { reply, fuentes } = await sendChatMessage(historialActualizado);
      setMessages([...historialActualizado, { role: 'assistant', content: reply, fuentes }]);
      setStatus('idle');
    } catch (error) {
      setStatus('error');
      setErrorMsg(error.message);
    }
  };

  const handleReset = () => {
    setMessages([MENSAJE_BIENVENIDA]);
    setStatus('idle');
    setErrorMsg('');
  };

  // Minimizado: una sola burbuja flotante, visible en cualquier
  // página del sitio. Es deliberadamente pequeña y discreta — el
  // protagonismo es del contenido de la página que se está mirando,
  // no del chat.
  if (!expanded) {
    return (
      <button
        type="button"
        className="chat-widget__launcher"
        onClick={onExpand}
        aria-label="Abrir Mentor IA"
      >
        <span className="chat-widget__launcher-dot" aria-hidden="true" />
        Mentor IA
      </button>
    );
  }

  // Expandido: ocupa toda la ventana (position: fixed, inset: 0),
  // por encima de cualquier otra cosa en pantalla, igual que un chat
  // de pantalla completa tipo ChatGPT. El botón de minimizar es lo
  // único que lo distingue de "ser la app entera".
  return (
    <div className="chat-widget chat-widget--expanded" role="dialog" aria-label="Mentor IA">
      <header className="chat-widget__header">
        <span className="chat-widget__title">
          <span className="chat-widget__launcher-dot" aria-hidden="true" />
          Mentor IA
        </span>
        <div className="chat-widget__header-actions">
          <button
            type="button"
            className="chat-widget__icon-btn"
            onClick={handleReset}
            aria-label="Reiniciar conversación"
            title="Reiniciar conversación"
          >
            ↺
          </button>
          <button
            type="button"
            className="chat-widget__icon-btn"
            onClick={onMinimize}
            aria-label="Minimizar"
            title="Minimizar"
          >
            ‹
          </button>
        </div>
      </header>

      <div className="chat-widget__messages">
        <div className="chat-widget__messages-inner">
          {messages.map((message, index) => (
            <div key={index} className={`chat-message chat-message--${message.role}`}>
              {message.role === 'assistant'
                ? <MathText text={message.content} />
                : message.content}
              {message.fuentes && message.fuentes.length > 0 && (
                <div className="chat-message__sources">
                  Fuentes consultadas: {message.fuentes.join(' · ')}
                </div>
              )}
            </div>
          ))}

          {status === 'sending' && (
            <div className="chat-message chat-message--assistant chat-message--typing">
              Escribiendo…
            </div>
          )}

          {status === 'error' && (
            <p className="state-message state-message--error">
              {errorMsg || 'No se pudo conectar con el Mentor IA.'}
            </p>
          )}

          <div ref={scrollRef} />
        </div>
      </div>

      <form className="chat-widget__form" onSubmit={handleSubmit}>
        <div className="chat-widget__form-inner">
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Escribe tu pregunta sobre la PAES…"
            disabled={status === 'sending'}
            autoFocus
          />
          <button type="submit" disabled={status === 'sending' || !input.trim()}>
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWidget;
