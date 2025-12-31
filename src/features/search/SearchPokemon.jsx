import { Input } from '@material-tailwind/react';
import { useSearch } from './useSearch';

export const SearchPokemon = () => {
  const { searchFilter, filterPokemons } = useSearch();

  const handleSearchChange = (e) => {
    filterPokemons(e.target.value);
  };

  return (
    <div className="w-full">
      <Input
        label="Buscar Pokémon..."
        value={searchFilter}
        onChange={handleSearchChange}
        className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 dark:!border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:!border-white dark:focus:!border-t-white"
        labelProps={{
          className: "hidden",
        }}
        containerProps={{
          className: "min-w-[100px]",
        }}
      />
    </div>
  );
};
