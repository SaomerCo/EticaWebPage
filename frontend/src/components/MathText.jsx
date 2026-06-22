import katex from 'katex';
// El CSS de KaTeX incluye las fuentes y estilos necesarios para que
// los símbolos matemáticos se vean bien. Se importa aquí una sola vez
// y Vite lo inyecta globalmente en el bundle.
import 'katex/dist/katex.min.css';

// Divide el texto en fragmentos alternando "texto normal" y "LaTeX".
// Ejemplo: "El área es $A = \pi r^{2}$ para cualquier radio $r$."
// → ["El área es ", "A = \\pi r^{2}", " para cualquier radio ", "r", "."]
// Los índices pares son texto normal, los impares son expresiones LaTeX.
const partirTexto = (texto) => texto.split(/\$([^$]+)\$/g);

const MathText = ({ text, block = false }) => {
  if (!text) return null;

  const partes = partirTexto(text);

  return (
    <>
      {partes.map((parte, indice) => {
        if (indice % 2 === 1) {
          // Fragmento de LaTeX: renderizar con KaTeX.
          // throwOnError: false hace que un error de sintaxis LaTeX
          // muestre el texto original en vez de romper el componente.
          try {
            const html = katex.renderToString(parte, {
              throwOnError: false,
              displayMode: block,
            });
            return (
              <span
                key={indice}
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          } catch {
            return <span key={indice}>{parte}</span>;
          }
        }
        // Texto normal, sin procesar.
        return <span key={indice}>{parte}</span>;
      })}
    </>
  );
};

export default MathText;
