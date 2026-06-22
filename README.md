# PAES Mentor

Plataforma web gratuita para estudiantes de 4° medio en Chile, orientada a
la preparación de la PAES con material oficial centralizado y una IA
educativa especializada (RAG sobre documentos oficiales + Ollama).

## Stack

- **Frontend:** React 18 + Vite
- **Backend:** Node.js + Express
- **Base de datos:** PostgreSQL
- **IA (fases posteriores):** Ollama local + RAG

## Estructura del proyecto

```
paes-mentor/
├── backend/      → API REST (Express)
├── frontend/     → SPA (React + Vite)
└── database/     → Scripts SQL
```

## Requisitos previos

- Node.js 18 o superior
- PostgreSQL 14 o superior, corriendo localmente
- [Ollama](https://ollama.com/download) instalado, con los modelos `llama3.2` y `nomic-embed-text` descargados (`ollama pull llama3.2` y `ollama pull nomic-embed-text`)
- npm

## Puesta en marcha (Fase 1)

### 1. Base de datos

```bash
psql -U postgres -f database/init.sql
psql -U postgres -d paes_mentor -f database/schema.sql
psql -U postgres -d paes_mentor -f database/seed.sql
psql -U postgres -d paes_mentor -f database/descargables_schema.sql
psql -U postgres -d paes_mentor -f database/descargables_seed.sql
psql -U postgres -d paes_mentor -f database/calendario_schema.sql
psql -U postgres -d paes_mentor -f database/calendario_seed.sql
psql -U postgres -d paes_mentor -f database/rag_schema.sql
psql -U postgres -d paes_mentor -f database/paginas_recomendadas_schema.sql
psql -U postgres -d paes_mentor -f database/paginas_recomendadas_seed.sql
```

Esto crea la base de datos `paes_mentor` y todas sus tablas (materias,
unidades, contenidos, fórmulas, ejercicios, descargables, eventos del
calendario, documentos RAG), con datos de ejemplo basados en
información oficial verificada del DEMRE. Después de levantar el
backend por primera vez, corre también:

```bash
cd backend
npm run ingest:rag
```

para generar los embeddings del contenido de la plataforma (necesario
para que el Mentor IA pueda buscar contexto real al responder).

### 2. Backend

```bash
cd backend
cp .env.example .env
# Edita .env con tus credenciales reales de PostgreSQL
npm install
npm run dev
```

El servidor queda escuchando en `http://localhost:4000`.

### 3. Frontend

En otra terminal:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`.

### 4. Verificación

Abre `http://localhost:5173` en el navegador. Si todo está correctamente
configurado, deberías ver el mensaje **"Backend conectado correctamente"**
junto con la hora del servidor y el estado de la base de datos.

También puedes probar el backend de forma aislada:

```bash
curl http://localhost:4000/api/health
```

## Estado del proyecto

- [x] Fase 1 — Inicialización del proyecto y conexión frontend-backend-DB
- [x] Fase 2 — Página de inicio completa, navegación y enrutamiento
- [x] Fase 3 — Modelo de datos y sección de Materias
- [x] Fase 4 — Descargables (PDFs)
- [x] Fase 5 — Calendario PAES
- [x] Fase 6a — Chat IA conectado a Ollama (sin RAG todavía)
- [x] Fase 6b — Sistema RAG sobre documentos oficiales
- [x] Fase 8a — Rediseño visual + Mentor IA a pantalla completa
- [x] Fase 8b — Materias: recursos curados en vez de contenido fijo
- [x] Fase 8c — Cuestionarios configurables + KaTeX + banco de preguntas ampliado
- [ ] Fase 9 — Lanzamiento
