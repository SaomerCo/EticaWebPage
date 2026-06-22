import dotenv from 'dotenv';

dotenv.config();

// Ollama corre como un servicio local en la propia máquina (no es un
// servicio en la nube): por defecto expone su API en el puerto 11434.
// Se lee desde el .env igual que la configuración de PostgreSQL, para
// no tener URLs ni nombres de modelo escritos a mano en el código.
export const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
export const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3.2';
export const OLLAMA_EMBED_MODEL = process.env.OLLAMA_EMBED_MODEL || 'nomic-embed-text';
