# Plan de Ejecución por Fases

## 📋 Resumen Ejecutivo

| Fase | Enfoque | Prioridad | Ejecución |
|------|---------|-----------|------------|
| FASE 1 | Auditoría y Saneamiento | 🔴 Alta | 🤖 Multiagente |
| FASE 2 | Testing | 🔴 Alta | ✋ Manual (Usuario) |
| FASE 3 | Optimización de Rendimiento | 🟡 Media | 🤖 Multiagente |
| FASE 4 | Refactorización Arquitectura | 🟡 Media | 🤖 Multiagente |
| FASE 5 | Nuevas Funcionalidades | 🟢 Baja | 🤖 Multiagente |
| FASE 6 | Calidad Final | 🟢 Baja | 🤖 Multiagente |

> **Nota:** FASE 2 (Testing) y TypeScript en FASE 6 serán ejecutados manualmente por el usuario.

---

## ✅ Estado Actual (Completado)

| Fase | Estado | Notas |
|------|--------|-------|
| FASE 1 | ✅ Completada | Eliminado zod, auditado código, fixed dependencias circulares |
| FASE 2 | ⏸️ Pendiente | Testing manual |
| FASE 3 | ✅ Completada | Cache híbrida, memoization, seed 80% reducido |
| FASE 4 | ✅ Completada | FSD/Clean Architecture verificado - ya estaba bien |
| FASE 5 | ✅ Completada | Página de detalles `/pokemon/:id` creada |
| FASE 6 | ⏸️ Pendiente | Accesibilidad, PWA, TypeScript manual |

---

## 🔴 FASE 1: Auditoría y Saneamiento
**Objetivo:** Estabilizar el sistema y eliminar deuda técnica inmediata

### 1.1 Análisis de Superficie
- [ ] Mapear todos los archivos del proyecto
- [ ] Documentar flujo de datos actual
- [ ] Identificar dependencias circulares restantes

### 1.2 Caza de Bugs
- [ ] Revisar console.logs y console.errors restantes
- [ ] Verificar manejo de errores en API calls
- [ ] Revisar casos edge en favoritos (IDs inválidos)
- [ ] Verificar persistencia en localStorage

### 1.3 Saneamiento de Código
- [ ] Eliminar console.logs de debug
- [ ] Eliminar comentarios obsoletos
- [ ] Limpiar variables no usadas
- [ ] Verificar que todos los imports son necesarios

**Entregables:**
- Reporte de bugs encontrados
- Código limpio sin warnings

---

## 🔴 FASE 2: Testing
**Objetivo:** Establecer una base sólida de pruebas automatizadas

### 2.1 Configuración de Testing
- [ ] Instalar Vitest
- [ ] Instalar React Testing Library
- [ ] Configurar Vitest en vite.config.js
- [ ] Crear scripts en package.json

### 2.2 Pruebas Unitarias
- [ ] Tests para reducers (pokemon, search, favorites, theme)
- [ ] Tests para custom hooks
- [ ] Tests para util functions

### 2.3 Pruebas de Integración
- [ ] Tests para flujos de búsqueda
- [ ] Tests para flujo de favoritos
- [ ] Tests para paginación

**Entregables:**
- Estructura de tests implementada
- Cobertura ≥ 70% en lógica de negocio

---

## 🟡 FASE 3: Optimización de Rendimiento
**Objetivo:** Mejorar performance sin cambiar arquitectura

### 3.1 Optimización de API
- [ ] Revisar estrategia de cache (Memory → IndexedDB)
- [ ] Implementar stale-while-revalidate
- [ ] Considerar datos adicionales en seed (stats, abilities)

### 3.2 Optimización de React
- [ ] Implementar React.memo en PokemonCard
- [ ] Añadir useMemo/useCallback donde sea necesario
- [ ] Revisar re-renders innecesarios

### 3.3 Optimización de Bundle
- [ ] Reducir tamaño del seed (solo datos necesarios)
- [ ] Lazy loading de imágenes
- [ ] Tree shaking adicional

**Entregables:**
- Lighthouse score ≥ 90
- Bundle < 300KB inicial

---

## 🟡 FASE 4: Refactorización Arquitectura
**Objetivo:** Transformar en código escalable y mantenible

### 4.1 Feature-Sliced Design (FSD)
- [ ] Verificar que estructura actual sigue FSD
- [ ] Separar containers de presentational components
- [ ] Aplicar patrón Facade en hooks

### 4.2 Clean Architecture
- [ ] Extraer domain entities (ya existe en /entities)
- [ ] Aislar API layer completamente
- [ ] Aplicar Dependency Inversion

### 4.3 Patrones de Diseño
- [ ] Implementar Strategy pattern para tipos de búsqueda
- [ ] Revisar uso de Observer en Redux

**Entregables:**
- Arquitectura documentada en diagrama
- Código sigue SOLID/DRY/KISS

---

## 🟢 FASE 5: Nuevas Funcionalidades
**Objetivo:** Agregar features que mejoran UX

### 5.1 Página de Detalles
- [ ] Crear ruta /pokemon/:id
- [ ] Mostrar stats, abilities, evolutions
- [ ] Diseño responsive

### 5.2 Filtros Avanzados
- [ ] Filtro por tipo (fire, water, grass, etc.)
- [ ] Filtro por generación
- [ ] Ordenar por nombre/ID

### 5.3 Autenticación (opcional)
- [ ] Login simple con localStorage
- [ ] Favoritos por usuario
- [ ] Persistencia en backend (Firebase/Supabase)

**Entregables:**
- Página de detalles funcional
- Filtros operativos

---

## 🟢 FASE 6: Calidad Final
**Objetivo:** Pulido profesional y preparación para producción

### 6.1 Accesibilidad
- [ ] Verificar contraste WCAG 4.5:1
- [ ] Soporte de teclado (tab navigation)
- [ ] ARIA labels donde sea necesario

### 6.2 PWA
- [ ] Service Worker para offline
- [ ] Manifest.json
- [ ] Instalable en móvil

### 6.3 TypeScript (opcional)
- [ ] Migrar gradualmente a .tsx
- [ ] Tipar todos los componentes
- [ ] Strict mode enabled

**Entregables:**
- PWA instalable
- Accesibilidad 100%

---

## 🚀 Orden de Ejecución Sugerido

```
Semana 1-2: FASE 1 (Auditoría)
Semana 3-4: FASE 2 (Testing)
Semana 5-6: FASE 3 (Optimización)
Semana 7-8: FASE 4 (Refactorización)
Semana 9-10: FASE 5 (Features)
Semana 11-12: FASE 6 (Calidad Final)
```

---

## 📌 Próximo Paso

Iniciar **FASE 1: Auditoría y Saneamiento**

¿Comenzamos con la Fase 1?