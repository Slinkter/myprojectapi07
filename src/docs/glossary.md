# 📘 Glosario de Términos

Este documento centraliza y define la terminología técnica clave utilizada en el desarrollo de **Pokédex API 07**. El objetivo es proporcionar un lenguaje común y claro para todos los involucrados en el proyecto.

---

### A

-   **API (Application Programming Interface):**
    Interfaz de Programación de Aplicaciones. Es un conjunto de reglas y herramientas que permiten que diferentes aplicaciones de software se comuniquen entre sí. En este proyecto, consumimos la [PokéAPI v2](https://pokeapi.co/) para obtener todos los datos de los Pokémon.

-   **Axios:**
    Un cliente HTTP basado en promesas para el navegador y Node.js. Se utiliza en este proyecto para realizar todas las peticiones a la API de forma centralizada y manejando interceptores para la gestión de errores.

### C

-   **Componente (React Component):**
    Los componentes son las piezas fundamentales de una aplicación de React. Son funciones o clases de JavaScript que aceptan entradas (props) y devuelven elementos de React que describen lo que debe aparecer en pantalla. Pueden ser "funcionales" (la práctica moderna) o "de clase".

-   **Custom Hook:**
    Ver **Hook (React Hook)**.

### F

-   **Feature-Based Architecture (Arquitectura Basada en Funcionalidades):**
    Un patrón de arquitectura de software donde el código se organiza en torno a las funcionalidades del producto, en lugar de por tipo de archivo (ej. `components`, `hooks`, `services` en carpetas separadas). En este proyecto, se implementa con el directorio `src/features`, donde cada subdirectorio (`pokemon`, `search`) es un módulo autocontenido.

### H

-   **Hook (React Hook):**
    Una función especial que permite "enganchar" (utilizar) el estado de React y otras características de React sin escribir una clase. Los hooks básicos son `useState`, `useEffect` y `useContext`. Un **Custom Hook** es una función que empieza por `use` y que puede llamar a otros hooks, permitiendo reutilizar lógica con estado entre componentes. `usePagination` es un ejemplo de Custom Hook en este proyecto.

### J

-   **JavaScript (ES6+):**
    El lenguaje de programación en el que está escrito el proyecto. Se utilizan características modernas de ECMAScript 2015 (ES6) y posteriores, como `arrow functions`, `const`/`let`, `async/await` y `modules`.

-   **JSDoc:**
    Un lenguaje de marcado para anotar archivos de código fuente de JavaScript. Permite escribir comentarios de documentación que pueden ser procesados por herramientas para generar documentación HTML o para proporcionar autocompletado y verificación de tipos en editores de código.

-   **JSX (JavaScript XML):**
    Una extensión de la sintaxis de JavaScript que permite escribir una estructura similar a HTML en el código de React. Facilita la creación de la interfaz de usuario de forma declarativa.

### P

-   **pnpm:**
    Un gestor de paquetes para JavaScript rápido y eficiente con el espacio en disco. Es la herramienta recomendada para instalar las dependencias de este proyecto.

-   **Props (Properties):**
    Las `props` son las entradas que recibe un componente de React. Son objetos que contienen los valores que el componente padre le pasa para configurar su comportamiento y su renderizado. Son de solo lectura.

### R

-   **React:**
    Una biblioteca de JavaScript para construir interfaces de usuario. Permite crear componentes de UI reutilizables y gestionar su estado de forma eficiente. Es la base de toda la aplicación.

-   **Redux Toolkit:**
    El conjunto de herramientas oficial y recomendado para el desarrollo con Redux. Simplifica enormemente la configuración del store, la creación de *reducers* y la gestión de lógica asíncrona. En este proyecto, se usa para gestionar todo el estado global.

-   **Responsive Design (Diseño Adaptable):**
    Una práctica de diseño web que busca que la interfaz de usuario se adapte y se vea bien en cualquier tamaño de pantalla, desde dispositivos móviles pequeños hasta monitores de escritorio grandes. En este proyecto se logra principalmente con las utilidades responsive de Tailwind CSS.

### S

-   **Single Page Application (SPA):**
    Una aplicación web que interactúa con el usuario reescribiendo dinámicamente la página actual en lugar de cargar páginas completamente nuevas desde el servidor. Esto proporciona una experiencia de usuario más fluida y rápida, similar a la de una aplicación de escritorio.

-   **Slice (Redux Slice):**
    Una porción del estado global de Redux que corresponde a una única funcionalidad. Con Redux Toolkit, un `slice` se crea con la función `createSlice` e incluye el *reducer*, los nombres de las acciones y los *action creators* para esa porción del estado.

-   **State (Estado):**
    Un objeto que representa las partes de la aplicación que pueden cambiar con el tiempo. En React, cada componente puede tener su propio estado local (`useState`), y también existe un estado global para toda la aplicación (gestionado por Redux).

### T

-   **Tailwind CSS:**
    Un framework de CSS "utility-first" que proporciona clases de bajo nivel para construir diseños personalizados directamente en el HTML/JSX, sin escribir CSS tradicional. Permite un desarrollo rápido y un diseño consistente.

### V

-   **Vite:**
    Una herramienta de construcción (build tool) de frontend moderna que ofrece un servidor de desarrollo extremadamente rápido gracias a su uso de módulos ES nativos y un empaquetado optimizado para producción. Es el motor que compila y sirve esta aplicación.