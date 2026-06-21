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
- npm

## Puesta en marcha (Fase 1)

### 1. Base de datos

```bash
psql -U postgres -f database/init.sql
```

Esto crea la base de datos `paes_mentor` vacía.

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
- [ ] Fase 2 — Página de inicio completa, navegación y enrutamiento
- [ ] Fase 3 — Modelo de datos y sección de Materias
- [ ] Fase 4 — Descargables (PDFs)
- [ ] Fase 5 — Calendario PAES
- [ ] Fase 6 — Chat IA con RAG sobre documentos oficiales
