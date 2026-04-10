# Calidad, Seguridad y Despliegue: Guías de Seguridad

Este documento describe las directrices y las mejores prácticas de seguridad aplicadas en el desarrollo del Frontend de `myprojectapi07` para proteger la aplicación y a sus usuarios contra vulnerabilidades comunes.

---

## 1. Principios Generales de Seguridad en Frontend

*   **Defensa en Profundidad:** Implementar múltiples capas de seguridad para que la falla de una no comprometa todo el sistema.
*   **Mínimos Privilegios:** La aplicación y sus componentes solo deben tener los permisos estrictamente necesarios para funcionar.
*   **Validación de Entradas:** Nunca confiar en los datos provenientes del cliente. Siempre validar, sanear y escapar cualquier entrada.

## 2. Protección contra Vulnerabilidades Comunes

### 2.1 Cross-Site Scripting (XSS)

*   **Descripción:** Ataques XSS ocurren cuando un atacante inyecta scripts maliciosos en páginas web que son vistos por otros usuarios.
*   **Medidas de Protección:**
    *   **React:** React, por defecto, escapa el contenido JSX, lo que previene XSS básicos.
    *   **Sanitización:** Cuando se muestra contenido HTML generado por el usuario (si aplica, en este proyecto no), siempre debe ser sanitizado en el backend o utilizando librerías específicas en el Frontend (ej. `DOMPurify`) para eliminar etiquetas y atributos peligrosos.
    *   **`dangerouslySetInnerHTML`:** Evitar su uso a toda costa. Si es absolutamente necesario, el contenido debe ser sanitizado previamente de forma rigurosa.

### 2.2 Inyección de Dependencias Maliciosas

*   **Descripción:** Los atacantes pueden intentar inyectar paquetes maliciosos en la cadena de suministro (supply chain) a través de dependencias comprometidas.
*   **Medidas de Protección:**
    *   **Auditoría de Dependencias:** Ejecutar regularmente `pnpm audit` para identificar y corregir vulnerabilidades conocidas en las dependencias.
    *   **Actualizaciones:** Mantener las dependencias actualizadas a sus últimas versiones estables para beneficiarse de los parches de seguridad.
    *   **Origen Confiable:** Usar solo paquetes de registros npm/pnpm oficiales y verificar su autenticidad.

### 2.3 Almacenamiento Seguro del Lado del Cliente

*   **Descripción:** Almacenar información sensible (tokens de autenticación, datos personales) en el navegador puede exponerla a ataques.
*   **Medidas de Protección:**
    *   **LocalStorage/SessionStorage:** No almacenar información sensible que deba estar protegida. En este proyecto, solo los IDs de Pokémon favoritos se almacenan en `localStorage`, lo cual no se considera información sensible.
    *   **Cookies HttpOnly/Secure:** Para tokens de sesión que requieran mayor seguridad, es preferible utilizar cookies `HttpOnly` y `Secure`, gestionadas por el backend, que son inaccesibles desde JavaScript del cliente. (Actualmente no aplica al proyecto).

### 2.4 Control de Acceso (Autorización)

*   **Descripción:** Asegurar que los usuarios solo puedan acceder a los recursos y realizar las acciones para las que tienen permiso.
*   **Medidas de Protección:**
    *   **Backend:** La lógica de autorización debe residir principalmente en el backend, que es el único que puede verificar de forma segura los permisos.
    *   **Frontend:** El Frontend puede ocultar o deshabilitar elementos de la UI basándose en los permisos recibidos del backend, pero esto es solo una mejora de UX, no una medida de seguridad. (Actualmente no aplica al proyecto, ya que no tiene autenticación/autorización).

## 3. Seguridad de las Comunicaciones (HTTPS)

*   **Descripción:** Las comunicaciones entre el cliente y el servidor deben estar cifradas para prevenir la intercepción y manipulación de datos.
*   **Medidas de Protección:**
    *   **HTTPS:** La aplicación se despliega y accede siempre a través de HTTPS. La PokeAPI también utiliza HTTPS.
    *   **HSTS (HTTP Strict Transport Security):** Configurar el servidor para forzar el uso de HTTPS.

## 4. Uso de Headers de Seguridad

*   **Descripción:** Configurar headers HTTP de seguridad en el servidor web (o CDN) puede añadir capas adicionales de protección.
*   **Medidas de Protección (a implementar en el servidor de despliegue):**
    *   **Content Security Policy (CSP):** Controla qué recursos (scripts, estilos, imágenes) puede cargar el navegador.
    *   **X-Content-Type-Options: nosniff:** Previene que el navegador "adivine" el tipo MIME de los archivos.
    *   **X-Frame-Options: DENY:** Previene ataques Clickjacking.

---
*Este documento es generado y mantenido automáticamente como parte de la documentación del proyecto.*
