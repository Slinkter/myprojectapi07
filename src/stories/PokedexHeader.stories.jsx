import PokedexHeader from '../features/pokemon/components/PokedexHeader';

export default {
  component: PokedexHeader,
  title: 'Pokemon/PokedexHeader',
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