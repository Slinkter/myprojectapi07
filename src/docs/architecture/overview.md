# 🏛️ Visión General de la Arquitectura

## 1. Filosofía del Proyecto

El proyecto se rige por tres pilares fundamentales:

- **Separación de Responsabilidades (SoC):** La lógica de negocio, la lógica de estado y la representación visual están claramente delimitadas.
- **Bajo Acoplamiento:** Las funcionalidades (features) son autónomas y no dependen de la implementación interna de otras.
- **Escalabilidad:** La estructura permite añadir cientos de Pokémon y nuevas capacidades sin degradar la arquitectura base.

## 2. Feature-Based Architecture

Cada carpeta dentro de `src/features` representa un dominio de conocimiento.

### Anatomía de una Feature:

- `api/`: Llamadas al servidor específicas del dominio.
- `components/`: UI local de la funcionalidad.
- `hooks/`: Lógica de React (Custom Hooks) que encapsula el comportamiento.
- `state/`: Slices de Redux y lógica de estado.
- `index.js`: **Barrel Export**. Es el único punto de entrada autorizado para el resto de la app.

## 3. Patrón Container / Presentation

Implementado a través de Custom Hooks:

- **Container (Custom Hook):** Gestiona el estado y los efectos (ej. `usePokemon`).
- **Presentation (Componente):** Recibe datos por props y renderiza UI pura (ej. `PokemonCard`).

## 4. Flujo de Datos

1. El usuario interactúa con la UI.
2. El componente despacha una acción o llama a un método del Custom Hook.
3. El Custom Hook interactúa con Redux (vía dispatch) o llama a un Service.
4. El estado se actualiza y la UI reactiva se renderiza con los nuevos datos.

---

[Regresar al README](../../README.md)
