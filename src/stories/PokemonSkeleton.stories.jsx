import PokemonSkeleton from '../features/pokemon/components/PokemonSkeleton';

export default {
  component: PokemonSkeleton,
  title: 'Pokemon/PokemonSkeleton',
  tags: ['autodocs'],
};

export const Default = {
  args: {},
};

export const DarkMode = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  args: {},
};