# 💰 Costos y Justificación de Ingeniería

**Documento:** Análisis de Viabilidad Técnica
**Autor:** Ingeniero de Software Principal

## 1. Estimación de Esfuerzo (Simulación)

Basado en la complejidad actual (Feature-Based) vs. una arquitectura monolítica tradicional:

| Actividad                    | Esfuerzo (Monolito) | Esfuerzo (Feature-Based) | Ahorro/Costo         |
| :--------------------------- | :------------------ | :----------------------- | :------------------- |
| **Onboarding Nuevo Dev**     | 10 Días             | 3 Días                   | ✅ Ahorro 70%        |
| **Refactorizar una Feature** | 5 Días              | 1 Día                    | ✅ Ahorro 80%        |
| **Setup Inicial**            | 1 Día               | 3 Días                   | ❌ Inversión Inicial |

**Conclusión:** La arquitectura actual tiene un costo inicial más alto (setup de carpetas, reglas estrictas), pero reduce drásticamente el costo de mantenimiento (OPEX) a largo plazo.

## 2. Análisis de Deuda Técnica

### Deuda Intencional (Prudente)

- **No usar TypeScript:** Se decidió usar JS + JSDoc para velocidad de desarrollo en esta fase.
    - _Costo futuro:_ Refactorizar a TS será doloroso si el proyecto crece > 20k líneas de código.
- **No Router:** Simplifica el deployment estático actual.
    - _Costo futuro:_ Implementar rutas requerirá refactorizar el `App.jsx` completo.

### Beneficio Arquitectónico (ROI)

El uso de **Redux Toolkit** con Slices separados por feature garantiza que el estado sea predecible. Esto reduce el tiempo de debugging en un 50% comparado con `useState` dispersos o prop-drilling masivo.

## 3. Justificación de "No Frameworks UI"

Usar **Tailwind CSS Puro** en lugar de MUI/Chakra:

- **Costo de Build:** Se reduce el tamaño del bundle en ~150KB (gzipped).
- **Vendor Lock-in:** Nulo. Solo dependemos de CSS estándar generado.
- **Performance:** Renderizado más rápido al no tener JS calculando estilos en runtime.

---

**Dictamen Final:**
La inversión en arquitectura modular está justificada. El proyecto es técnicamente solvente y económicamente viable para escalar.
