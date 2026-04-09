import PokemonCard from '../features/pokemon/components/PokemonCard';

export default {
  component: PokemonCard,
  title: 'Pokemon/PokemonCard',
  tags: ['autodocs'],
  argTypes: {
    favorite: { control: 'boolean' },
  },
};

export const Default = {
  args: {
    id: 1,
    name: 'bulbasaur',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    types: ['grass', 'poison'],
    favorite: false,
    index: 0,
  },
};

export const Favorite = {
  args: {
    ...Default.args,
    favorite: true,
  },
};

export const FireType = {
  args: {
    id: 4,
    name: 'charmander',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
    types: ['fire'],
    favorite: false,
    index: 3,
  },
};

export const WaterType = {
  args: {
    id: 7,
    name: 'squirtle',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
    types: ['water'],
    favorite: true,
    index: 6,
  },
};

export const Loading = {
  args: {
    id: 0,
    name: '',
    image: '',
    types: [],
    favorite: false,
    index: 0,
  },
};