# CASOS DE USO

## Actor: Usuario Final

### CU-01: Ver Listado de Pokémon

**Descripción**: El usuario puede ver una lista paginada de Pokémon.
**Flujo Principal**:

1. Accede a la aplicación.
2. El sistema carga los primeros Pokémon.
3. El usuario visualiza las tarjetas con imagen, nombre y tipos.

### CU-02: Buscar Pokémon

**Descripción**: El usuario filtra los Pokémon por nombre.
**Flujo Principal**:

1. El usuario introduce texto en la barra de búsqueda.
2. El sistema filtra en tiempo real la lista mostrada (basado en los datos cargados).
3. Si no hay coincidencias, muestra mensaje "No se encontraron resultados".

### CU-03: Gestionar Favoritos

**Descripción**: El usuario marca/desmarca Pokémon como favoritos.
**Flujo Principal**:

1. El usuario hace clic en la estrella de una tarjeta.
2. El sistema guarda el ID en favoritos (persistencia LocalStorage).
3. La estrella cambia de color (Amarillo = Favorito).
4. El Pokémon aparece en la barra superior de Favoritos.

### CU-04: Cambiar Tema

**Descripción**: Alternar entre modo Claro y Oscuro.
**Flujo Principal**:

1. El usuario hace clic en el botón de Sol/Luna en el Navbar.
2. La interfaz cambia inmediatamente de esquema de colores.
3. La preferencia se guarda para futuras visitas.

### CU-05: Navegar Paginación

**Descripción**: Moverse entre páginas de resultados.
**Flujo Principal**:

1. El usuario hace clic en "Siguiente" o número de página.
2. El sistema solicita el siguiente lote de Pokémon a la API.
3. Se muestra un Skeleton Loading durante la carga.
