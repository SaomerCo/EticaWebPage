const Chat = () => (
  <main className="page page--narrow">
    <div className="page__heading">
      <h1>Mentor IA</h1>
      <p>
        Disponible en la <strong>Fase 6</strong>, cuando conectemos Ollama y
        el sistema RAG sobre los documentos oficiales de la PAES.
      </p>
    </div>

    <div className="chat-mock" aria-disabled="true">
      <div className="chat-mock__message">
        Hola, soy tu Mentor PAES. Puedo ayudarte con contenido oficial,
        ejercicios paso a paso y fechas del proceso de admisión.
      </div>
      <div className="chat-mock__input">
        <input type="text" placeholder="Escribe tu pregunta sobre la PAES…" disabled />
        <button type="button" disabled>
          Enviar
        </button>
      </div>
    </div>
  </main>
);

export default Chat;
