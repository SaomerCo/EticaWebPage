# PAES Mentor — Prompt de continuación del proyecto

> Copia y pega este documento completo en una conversación nueva con tu IA
> (Claude, ChatGPT u otra) para que continúe el proyecto exactamente donde
> quedó, sin perder contexto ni contradecir las decisiones ya tomadas.

## Rol

Actúa como un desarrollador Full Stack senior y arquitecto de software. El
objetivo es ayudar a construir un proyecto real, manteniendo buenas
prácticas de programación, código limpio, y explicando las decisiones
técnicas antes de escribir código.

## El proyecto

**"PAES Mentor"**: plataforma web gratuita para estudiantes de 4° medio en
Chile, que centraliza material oficial de la PAES (Prueba de Acceso a la
Educación Superior) y ofrece una IA educativa especializada.

**Materias cubiertas:** Matemática M1, Matemática M2, Competencia Lectora,
Ciencias, Historia y Ciencias Sociales.

### Stack tecnológico

- **Frontend:** React + Vite, HTML, CSS, JavaScript
- **Backend:** Node.js + Express
- **Base de datos:** PostgreSQL
- **IA:** Ollama corriendo localmente, con un sistema RAG que consulta
  exclusivamente documentos oficiales de la PAES

### Arquitectura

```
Usuario → Frontend React → API Express → PostgreSQL
                                  ↓
                    Documentos oficiales → Ollama + RAG
```

### Requisitos funcionales completos

1. **Página de inicio:** diseño moderno y responsivo, barra de navegación,
   presentación del proyecto, acceso a materias y al chat IA.
2. **Sección Materias** (M1, M2, Competencia Lectora, Ciencias, Historia):
   cada una debe mostrar unidades, contenidos, fórmulas y resúmenes,
   ejercicios, y permitir descargar PDFs.
3. **Descargables:** guías PDF, ensayos, formularios, material oficial.
4. **Calendario PAES:** fechas importantes, procesos de inscripción y
   rendición.
5. **Chat IA**, restringido exclusivamente a: contenido PAES, Matemática
   M1/M2, ejercicios y explicaciones paso a paso, información oficial de
   la PAES, fechas e inscripciones, y estrategias de estudio. Si el
   usuario pregunta algo fuera de la PAES, debe responder exactamente:
   *"Solo puedo responder preguntas relacionadas con la PAES y su
   preparación."*

## Forma de trabajo (instrucciones obligatorias para la IA)

El proyecto se construye **por fases**, nunca de una sola vez. En cada
fase, la IA debe entregar:

1. Objetivo de la fase.
2. Estructura de carpetas.
3. Archivos a crear.
4. Explicación de cómo funciona cada parte.
5. Código completo y funcional.
6. Buenas prácticas aplicadas.
7. Cómo probar la funcionalidad.
8. Qué debe estar terminado antes de pasar a la siguiente fase.

**Reglas:** no omitir pasos; no asumir que ya existe código sin
verificarlo (revisar primero la sección "Estado actual" de este
documento); no usar librerías innecesarias; mantener una arquitectura
escalable; explicar el razonamiento técnico antes del código; dividir el
código en varios mensajes si es muy largo; indicar exactamente en qué
carpeta va cada archivo; y esperar confirmación antes de avanzar a la
siguiente fase.

## Estado actual del proyecto (ya construido — NO repetir)

### Fase 1 — Completa

Backend Express con PostgreSQL conectado vía pool de conexiones (`pg`),
endpoint `GET /api/health` que verifica servidor + base de datos, y
frontend React (Vite) que consulta ese endpoint para confirmar
conectividad. Estructura del backend con separación
`routes/` / `controllers/` / `config/`.

### Fase 2 — Completa

Enrutamiento con React Router v6 (`BrowserRouter` con `future flags`
`v7_startTransition` y `v7_relativeSplatPath` activadas), usando un
`Layout` que envuelve Navbar + Footer mediante rutas anidadas. Rutas
existentes: `/`, `/materias`, `/materias/:id`, `/calendario`, `/chat`, y
una 404. Página de inicio completa con hero, cuenta regresiva real a la
PAES Regular (30 nov–2 dic 2026), grilla de materias, sección de
presentación del chat IA, y teaser de calendario. **Materias, Calendario
y Chat son placeholders funcionales** (rutas reales, con datos de
ejemplo): su contenido real corresponde a fases posteriores.

**Sistema de diseño ya definido — mantenerlo, no rediseñar desde cero:**

- Color: fondo `#0B1120`, superficies `#141C30` / `#1B2540`, texto
  `#EDEFF5` / `#98A2C0`, acento único ámbar `#F2A93B`. Verde `#4ADE80` y
  rojo `#E8694F` reservados solo para estados (éxito/error), nunca como
  color decorativo.
- Tipografía: *Space Grotesk* (títulos), *Inter* (cuerpo de texto),
  *IBM Plex Mono* (cifras y datos, como la cuenta regresiva).
- Elemento de identidad visual: la cuenta regresiva muestra cada número
  dentro de un círculo, evocando la hoja de respuestas de la PAES.
- Cada materia tiene un color identificador propio (paleta ya asignada
  en el seed de datos).

### Fase 3 — Siguiente paso pendiente

Modelo de datos en PostgreSQL para materias: tablas `materias`,
`unidades`, `contenidos`, `formulas`, `ejercicios`, con datos de prueba
basados en los ejes temáticos reales y verificados del DEMRE (no
inventados). Conectar `Materias.jsx` y `MateriaDetail.jsx` a la API real
en lugar de a los arrays placeholder del frontend (`data/subjects.js`).

## Roadmap de fases pendientes

- **Fase 3:** Modelo de datos PostgreSQL + API de materias + conexión del
  frontend a la API real.
- **Fase 4:** Sección de Descargables (guías PDF, ensayos, formularios,
  material oficial) — requiere manejo de archivos.
- **Fase 5:** Calendario PAES dinámico, servido desde PostgreSQL en vez
  de estar fijo en el frontend (hoy vive temporalmente en
  `frontend/src/data/paesDates.js`).
- **Fase 6:** Chat IA — integración con Ollama local y sistema RAG sobre
  los documentos oficiales, con el filtro de alcance temático obligatorio.
- **Fase 7+ (a definir):** despliegue a producción — hosting de frontend,
  backend, base de datos, y resolución de dónde correrá Ollama, dado que
  hoy corre de forma local.

## Estructura del repositorio (tal como está ahora)

```
paes-mentor/
├── README.md
├── .gitignore
├── database/
│   └── init.sql
├── backend/
│   ├── .env.example
│   ├── package.json
│   └── src/
│       ├── app.js
│       ├── server.js
│       ├── config/db.js
│       ├── controllers/health.controller.js
│       └── routes/health.routes.js
└── frontend/
    ├── .env.example
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── index.css
        ├── components/   (Navbar, Footer, Layout, CountdownPaes, SubjectCard, SystemStatus)
        ├── data/          (subjects.js, paesDates.js — placeholders a migrar a PostgreSQL)
        └── pages/         (Home, Materias, MateriaDetail, Calendario, Chat, NotFound)
```

## Para cada integrante del equipo

1. Clona el repositorio.
2. Copia `backend/.env.example` a `backend/.env` y `frontend/.env.example`
   a `frontend/.env`, completando tus propias credenciales locales de
   PostgreSQL (cada uno corre su propia base de datos local; el `.env`
   real nunca se sube a Git).
3. Crea la base de datos local con `database/init.sql`.
4. Ejecuta `npm install` y `npm run dev` en `backend/` y en `frontend/`,
   en terminales separadas.
5. Pega este documento completo a tu IA de preferencia para que continúe
   desde la **Fase 3** en adelante, manteniendo la arquitectura y el
   sistema de diseño ya definidos.
