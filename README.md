# SGPF Frontend

Aplicación Angular para la gestión deportiva de Orense SC. Consume la API REST del backend y ofrece módulos de usuarios, jugadores, entrenadores, partidos y alineaciones.

## Requisitos

- Node.js 22 o superior.
- npm.
- Backend SGPF activo.

## Desarrollo local

```bash
npm ci
npm start
```

Abrir `http://localhost:4200`. En desarrollo, la API se consulta en `http://localhost:3000/api`, configurada en `src/environments/environment.ts`.

## Compilación de producción

```bash
npm ci
npm run build
```

La configuración de producción usa `/api` como ruta relativa. El servidor web debe redirigir esa ruta al backend Express. Los archivos compilados se generan dentro de `dist/`.

## Organización

- `src/app/components`: pantallas y formularios.
- `src/app/services`: comunicación y transformación de datos de la API.
- `src/app/guards`: protección de rutas por sesión y rol.
- `src/app/interceptors`: envío del JWT en las peticiones.
- `src/environments`: configuración de desarrollo y producción.
- `public`: recursos estáticos.

## Autenticación

El login obtiene un JWT del backend. `authInterceptor` envía ese token como `Authorization: Bearer <token>`. `authGuard` exige una sesión válida y `roleGuard` controla las pantallas disponibles según el rol.

## Verificación

```bash
npm run build
npm test
```

La explicación completa del sistema y el proceso de publicación se encuentra en `../DOCUMENTACION_EQUIPO.md`.
