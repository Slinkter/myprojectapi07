# 🧠 Registro de Decisiones Técnicas (ADR)

## ADR-001: Migración a Tailwind CSS Puro

- **Contexto:** Se detectó un exceso de consumo de recursos y falta de control estético al usar frameworks como MUI o Chakra.
- **Decisión:** Migrar 100% a Tailwind CSS.
- **Razón:** Zero runtime cost, mayor velocidad de desarrollo y facilidad para implementar diseños a medida (pixel-perfect).

## ADR-002: Arquitectura basada en Features

- **Contexto:** Estructuras tipo `src/components`, `src/containers` se vuelven inmanejables en proyectos grandes.
- **Decisión:** Agrupar lógica por dominio funcional.
- **Razón:** Facilita la localización de errores y permite que equipos trabajen en paralelo sin conflictos de merge significativos.

## ADR-003: Eliminación de Redux-Saga en favor de Redux-Toolkit Thunks

- **Contexto:** Las sagas añaden una curva de aprendizaje y un boilerplate excesivo.
- **Decisión:** Usar `createAsyncThunk`.
- **Razón:** Simplicidad y excelente integración con el sistema de tipos de Redux Toolkit.

## ADR-004: Centralización de API con Axios

- **Contexto:** Duplicación de lógica de error/configuración en múltiples archivos.
- **Decisión:** Crear un `httpClient` único en `src/lib`.
- **Razón:** Un solo punto para inyectar headers, interceptores de seguridad y formateo de errores.

---

[Regresar al README](../../README.md)
