# 📦 HANDOVER: State Transfer Protocol (SOP)
**Project:** MyProjectAPI07 (Pokédex Industrial Grade)
**Version:** 1.0.0-Beta-Refactor
**Last Agent:** OpenCode (gemma4:31b-cloud)
**Architecture Pattern:** Feature-Sliced Design (FSD) + Facade Pattern + Domain Driven Design (DDD)

---

## 🎯 CURRENT STATUS: "Surgical Decoupling"
The project is currently in the middle of a high-level refactor to achieve **Maximum Decoupling** between the UI (JSX) and the Logic (JS/State).

**Progress:** `[|||||||||||||-------]` **75%**
**Current Stage:** Between **Phase 2 (Hook Isolation)** and **Phase 3 (UI Purification)**.

---

## 🏗️ ARCHITECTURAL MAP (FOR NEW AGENT)

### 1. The Domain Layer (`src/entities/pokemon`)
- **Model Utilities (`utils.js`):** Pure functions for data transformation (enrichWithFavorites, filterBySearch).
- **Mapper (`mapper.js`):** Implementation of the **Mapper Pattern**. Transforms raw API data into clean Domain Entities.
- **Selectors (`selectors.js`):** High-performance memoized selectors that delegate logic to `utils.js`.
- **Domain Types (`src/lib/domainTypes.js`):** Single source of truth for data structures.

### 2. The API Shield (`src/features/pokemon/api/pokemonApi.js`)
- **N+1 Mitigation:** Implemented an In-Memory Cache (`Map`) to reduce HTTP requests.
- **Type Normalization:** Forced coercion of IDs to `Number` to solve the critical "Favorites Reset" bug during pagination.

### 3. The Facade Layer (`src/features/*/hooks/`)
The UI no longer speaks directly to Redux. All interaction is routed through **Facade Hooks**:
- ✅ `usePokemonCard.js`: Abstracts favorite toggles and state.
- ✅ `usePokemonList.js`: Abstracts loading, error, and fetch logic.
- ✅ `usePokemonSearch.js`: Abstracts search filter synchronization.
- ✅ `useFavorites.js`: Abstracts global favorite resolution.

### 4. Stability Layers
- **`GlobalErrorBoundary.jsx`**: Prevents app crashes during lazy-loading or render errors.

---

## 🚩 IMMEDIATE ACTION REQUIRED (NEXT STEPS)

The next agent **MUST NOT** implement new features. The sole mission is to complete the **UI Purification**:

1. **Purge components from Redux:** 
   - Go to `PokemonCard.jsx`, `PokemonList.jsx`, `PokedexPage.jsx`, and `SearchBar.jsx`.
   - **DELETE** all imports of `useSelector`, `useDispatch`, and Redux actions.
   - **INJECT** the corresponding Facade Hook (e.g., replace `useSelector` with `usePokemonList()`).
2. **Pure View Validation:** Ensure components only receive data via props or facade hooks. No business logic in `.jsx`.
3. **Final Validation:**
   - Run `npm run lint` $\rightarrow$ Expect 0 errors.
   - Run `npm run build` $\rightarrow$ Expect success.
   - Verify that Favorites persist across pagination (The "Zod-Lite/Number Coercion" fix must be preserved).

---

## ⚠️ CRITICAL WARNINGS
- **DO NOT** move the `entities/` folder; it's the core of the new FSD architecture.
- **DO NOT** remove the `Number(id)` coercion in the API/Mapper; it's the only thing preventing the "Favorites Reset" bug.
- **DO NOT** add new dependencies unless absolutely necessary.

**End of Transfer.**
