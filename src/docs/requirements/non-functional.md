# Requerimientos No Funcionales

Este documento describe los criterios de calidad y restricciones que el sistema `myprojectapi07` debe cumplir. Estos requerimientos definen el "cómo" la aplicación debe funcionar.

---

## 1. Rendimiento

### RNF1.1 - Velocidad de Carga
*   **Descripción:** La aplicación debe cargar la primera página de Pokémon en menos de 3 segundos en una conexión de banda ancha estándar (DSL/fibra).
*   **Métrica:** Tiempo de Carga de Contenido (LCP) y Tiempo hasta Interactivo (TTI).

### RNF1.2 - Responsividad de la UI
*   **Descripción:** La interfaz de usuario debe responder a las interacciones del usuario (clics, escritura) en menos de 500 ms.
*   **Métrica:** Retraso de la Primera Entrada (FID).

### RNF1.3 - Optimización de Peticiones API
*   **Descripción:** Las peticiones a la API deben ser eficientes, minimizando el número de llamadas y el volumen de datos transferidos.
*   **Métrica:** Número de peticiones por carga de página, tamaño de la respuesta.

## 2. Usabilidad y Experiencia de Usuario (UX)

### RNF2.1 - Intuitividad
*   **Descripción:** La interfaz debe ser intuitiva, permitiendo a un usuario promedio encontrar y utilizar las funcionalidades principales sin necesidad de un tutorial extenso.
*   **Métrica:** Tasa de éxito en la realización de tareas, tiempo para completar tareas.

### RNF2.2 - Accesibilidad
*   **Descripción:** La aplicación debe ser accesible para usuarios con discapacidades visuales o motoras leves, siguiendo las pautas WCAG 2.1 (nivel AA) cuando sea posible con los componentes de MUI.
*   **Métrica:** Puntuación en herramientas de auditoría de accesibilidad (ej. Lighthouse).

### RNF2.3 - Consistencia de la UI
*   **Descripción:** La interfaz de usuario debe mantener una apariencia y un comportamiento consistentes en toda la aplicación, siguiendo las directrices de Material Design.
*   **Métrica:** Revisión visual y adherence al sistema de diseño.

## 3. Escalabilidad

### RNF3.1 - Escalabilidad Frontend
*   **Descripción:** La arquitectura del Frontend debe permitir añadir nuevas funcionalidades (features) de forma modular y sin afectar el código existente.
*   **Métrica:** Facilidad para añadir una nueva feature sin modificar más de 3 archivos fuera del directorio de la feature.

### RNF3.2 - Volumen de Datos
*   **Descripción:** La aplicación debe manejar eficientemente listas de Pokémon de hasta 1000 elementos sin degradación significativa del rendimiento en la UI.
*   **Métrica:** Pruebas de carga con datasets más grandes.

## 4. Mantenibilidad

### RNF4.1 - Claridad del Código
*   **Descripción:** El código fuente debe ser claro, bien estructurado y documentado, siguiendo las convenciones de código establecidas.
*   **Métrica:** Puntuación en herramientas de análisis de calidad de código (ej. SonarQube) y facilidad de lectura por un nuevo desarrollador.

### RNF4.2 - Testabilidad
*   **Descripción:** Los componentes y la lógica de negocio deben ser fácilmente testeables de forma unitaria y de integración.
*   **Métrica:** Cobertura de pruebas (mínimo 80% para la lógica de negocio).

## 5. Seguridad

### RNF5.1 - Protección XSS
*   **Descripción:** La aplicación debe protegerse contra ataques de Cross-Site Scripting (XSS).
*   **Métrica:** Escaneos de seguridad.

### RNF5.2 - Almacenamiento Seguro
*   **Descripción:** La información sensible (si la hubiera) no debe ser almacenada en el cliente sin cifrado.
*   **Métrica:** Revisión de código. (En este proyecto, solo los favoritos son almacenados localmente y no son sensibles).

## 6. Compatibilidad

### RNF6.1 - Compatibilidad con Navegadores
*   **Descripción:** La aplicación debe ser completamente funcional en las últimas dos versiones principales de Chrome, Firefox, Edge y Safari.
*   **Métrica:** Pruebas en diferentes navegadores.

---
*Este documento es generado y mantenido automáticamente como parte de la documentación del proyecto.*
