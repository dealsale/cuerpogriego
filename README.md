# Cuerpo Griego

Entrenador y nutricionista con IA — Next.js (App Router) + Prisma (SQLite) + NextAuth + DeepSeek.

## Requisitos

- Node.js 20+

## Puesta en marcha

```bash
npm install
npx prisma migrate dev
npx tsx prisma/seed.ts   # crea el usuario admin demo y el catálogo de ejercicios
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

Usuario admin de prueba (creado por el seed): `admin@cuerpogriego.app` / `admin1234`.

## Variables de entorno (`.env`)

- `DATABASE_URL` — conexión SQLite (ya configurada para desarrollo local).
- `NEXTAUTH_SECRET` / `NEXTAUTH_URL` — requeridas por NextAuth.
- `DEEPSEEK_API_KEY` — opcional. Sin ella, la generación de rutinas y dietas usa datos de
  respaldo predefinidos en vez de llamar a la IA real.

## Estructura

- `app/` — rutas de Next.js (landing, auth, onboarding, app principal, admin, API routes).
- `lib/` — lógica de dominio (patrones de ejercicio, prompts de IA, generación de plan,
  matching de media de ejercicios, etc.), Prisma client, auth.
- `components/` — componentes de UI organizados por área (ui, auth, app, admin, exercise, landing).
- `prisma/` — esquema, migraciones y seed.

## Librería de ejercicios (panel admin)

Desde `/admin/ejercicios`, un administrador puede cargar un video (mp4/webm) o GIF por cada
ejercicio del catálogo. Cuando un ejercicio de una rutina generada coincide por nombre con una
entrada del catálogo que tiene media cargada, el modal de detalle del ejercicio muestra ese
video/GIF en lugar de la animación SVG. Si no hay coincidencia o no se cargó media, se sigue
mostrando la animación SVG como respaldo.

## Diseño original

El diseño fue creado en Claude Design; el bundle de handoff exportado se conserva en
`cuerpo-griego-brief-de-proyecto/` como referencia.
