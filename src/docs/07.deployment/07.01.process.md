# Calidad, Seguridad y Despliegue: Proceso de Despliegue

Este documento describe el proceso para desplegar la aplicación `myprojectapi07` a un entorno de producción. Actualmente, el proyecto está configurado para ser desplegado en GitHub Pages, pero los principios son aplicables a otros servicios de hosting estático.

---

## 1. Entorno de Despliegue Actual: GitHub Pages

El proyecto está configurado para ser desplegado de forma sencilla a GitHub Pages, una solución de hosting gratuita para proyectos estáticos directamente desde un repositorio de GitHub.

## 2. Proceso de Despliegue

El despliegue se gestiona mediante scripts definidos en `package.json`, utilizando la librería `gh-pages`.

### 2.1. Configuración de `gh-pages`

Asegúrate de que la sección `homepage` en `package.json` apunte a la URL correcta de tu GitHub Pages:

```json
// package.json
{
  // ...
  "homepage": "https://slinkter.github.io/myprojectapi07",
  // ...
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "devDependencies": {
    "gh-pages": "^6.3.0"
  }
}
```

*   **`homepage`**: Esta URL es crucial para que Vite configure correctamente las rutas base de los assets.
*   **`predeploy`**: Un script que se ejecuta automáticamente antes del script `deploy`. Su función es construir la aplicación para producción.
*   **`deploy`**: El script principal que utiliza `gh-pages` para publicar el contenido del directorio `dist` en la rama `gh-pages` de tu repositorio.

### 2.2. Pasos para el Despliegue Manual

Para desplegar la aplicación a GitHub Pages, sigue estos pasos:

1.  **Asegúrate de que tu código esté listo:**
    *   Todos los cambios deseados deben estar commiteados en la rama principal (`main` o `master`).
    *   Pasa todas las pruebas (`pnpm test`).
    *   Resuelve cualquier advertencia de linter (`pnpm run lint`).

2.  **Ejecuta el script de despliegue:**
    Abre tu terminal en la raíz del proyecto y ejecuta:

    ```bash
    pnpm run deploy
    ```
    Este comando hará lo siguiente:
    *   Ejecutará `pnpm run build` (debido al script `predeploy`), lo que creará una versión optimizada y minificada de tu aplicación en el directorio `dist/`.
    *   Utilizará `gh-pages` para subir el contenido del directorio `dist/` a una rama llamada `gh-pages` en tu repositorio de GitHub.

3.  **Verificar el Despliegue:**
    *   Una vez que el script `pnpm run deploy` haya finalizado, puedes visitar la URL configurada en `homepage` (ej. `https://slinkter.github.io/myprojectapi07`) para ver tu aplicación desplegada.
    *   Puede tomar unos minutos para que GitHub Pages actualice el sitio después del despliegue.

## 3. Consideraciones para Otros Entornos (Ej. Netlify, Vercel, AWS S3)

Aunque el proyecto usa GitHub Pages, la build generada en `dist/` es una aplicación web estática estándar, lo que facilita su despliegue en casi cualquier servicio de hosting estático:

*   **Servicios basados en Git:** Plataformas como Netlify o Vercel pueden integrarse directamente con tu repositorio. Simplemente necesitarías configurar el directorio de build (`dist/`) y el comando de build (`pnpm run build`).
*   **Hosting de Objetos (AWS S3, Google Cloud Storage):** Podrías subir el contenido del directorio `dist/` a un bucket de almacenamiento de objetos y configurarlo para servir contenido web estático.
*   **Servidores Web (Nginx, Apache):** El contenido de `dist/` puede ser servido directamente por cualquier servidor web tradicional.

### Pasos Generales para Despliegue a Otros Entornos:

1.  **Construir la Aplicación:**
    ```bash
    pnpm run build
    ```
2.  **Copiar el Directorio `dist/`:**
    Copia el contenido del directorio `dist/` al servidor o servicio de hosting de tu elección.

## 4. Rollback

En caso de un despliegue fallido o con errores críticos:

*   **GitHub Pages:** Puedes revertir a una versión anterior de la rama `gh-pages` en GitHub, o simplemente desplegar una versión corregida.
*   **Otros servicios:** La mayoría de los servicios de hosting ofrecen mecanismos de rollback a versiones anteriores.

---
*Este documento es generado y mantenido automáticamente como parte de la documentación del proyecto.*
