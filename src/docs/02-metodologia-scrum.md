# 🔄 Metodología SCRUM: `myprojectapi07`

**Documento:** Definición del Marco de Trabajo
**Equipo:** Simulado (Frontend Team)

## 1. Justificación de SCRUM

Se ha seleccionado **SCRUM** como marco de trabajo debido a:

1.  **Naturaleza Evolutiva:** El proyecto es una SPA que requiere iteraciones rápidas (Features) y feedback visual constante.
2.  **Incertidumbre de Requisitos:** La integración con APIs externas (PokéAPI) puede revelar datos inesperados que requieran adaptación UI rápida.
3.  **Entrega de Valor:** SCRUM permite entregar "Features Completas" (ej: Pokedex funcional, Buscador funcional) en lugar de capas técnicas aisladas.

---

## 2. Roles del Equipo (Simulación)

### 👑 Product Owner (PO)

- **Responsabilidad:** Define el "Qué". Maximiza el valor del producto.
- **Tareas en este proyecto:**
    - Priorizar la Features: Pokemon List > Detail > Search > Favorites.
    - Validar que la UI cumpla con las expectativas estéticas.

### 🛡️ Scrum Master (SM)

- **Responsabilidad:** Define el "Cómo" (proceso). Elimina impedimentos.
- **Tareas en este proyecto:**
    - Garantizar que no se instalen librerías prohibidas (MUI, etc.).
    - Facilitar la comunicación entre Diseño y Desarrollo.

### 🛠️ Equipo de Desarrollo (Dev Team)

- **Miembros:** Frontend Architect, UI Designer, Lead Developer.
- **Responsabilidad:** Entrega el incremento de producto "Terminado".
- **Capacidades:** React, Tailwind, Redux Logic.

---

## 3. Artefactos SCRUM

### 📋 Product Backlog (Pila de Producto)

Lista ordenada de todo lo que se conoce que es necesario en el producto.

1.  **Feature:** Visualización de lista de Pokémon con paginación infinita.
2.  **Feature:** Detalle de Pokémon (Stats, Types, Sprites).
3.  **Feature:** Buscador en tiempo real (Client-side filtering).
4.  **Feature:** Sistema de Favoritos (Persistencia local).
5.  **Tech:** Configuración de Tema (Dark/Light Mode).

### 🏃 Sprint Backlog

Elementos seleccionados para el Sprint actual (Documentación y Refactor).

- _Ticket-001:_ Generar documentación de Arquitectura.
- _Ticket-002:_ Auditoría de código existente.

### ✅ Incremento (Definition of Done - DoD)

Para que un item se considere "Terminado", debe cumplir:

- [ ] Código funcional y sin errores de consola.
- [ ] Estilizado 100% con Tailwind CSS (sin CSS puro arbitrario).
- [ ] Responsive verificado (Mobile, Tablet, Desktop).
- [ ] JSDoc completo en español en todos los archivos nuevos.
- [ ] Aprobado por el Product Owner.

---

## 4. Eventos (Ceremonias)

- **Sprint Planning:** Selección de features para los próximos 10 días.
- **Daily Standup:** Sincronización diaria (simulada en commits).
- **Sprint Review:** Demo del incremento al usuario final.
- **Sprint Retrospective:** Análisis de mejoras técnicas (ej: "Debemos mejorar la estructura de carpetas").

---

**Firma:**
Scrum Master (Simulado)
