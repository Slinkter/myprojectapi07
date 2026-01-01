
import PropTypes from 'prop-types';
import { useFavorites } from '@/features/favorites/useFavorites';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  Chip,
  Stack,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

// Define animation keyframes at the module level
const cardAnimation = {
  '@keyframes fadeInSlideUp': {
    '0%': {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
};

const PokemonCard = ({ id, name, image, types, favorite, index = 0 }) => {
  const { togglePokemonFavorite } = useFavorites();

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    togglePokemonFavorite(id);
  };

  return (
    <Card
      elevation={2}
      sx={{
        ...cardAnimation,
        height: '100%', // Ensure all cards in a row have the same height
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        border: '1px solid',
        borderColor: 'divider',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.3s ease-in-out',
        opacity: 0,
        animation: `fadeInSlideUp 0.5s ease-out forwards`,
        animationDelay: `${index * 70}ms`,

        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: (theme) =>
            `${theme.shadows[10]}, 0 0 20px ${
              theme.palette.mode === 'dark'
                ? theme.palette.primary.dark
                : theme.palette.primary.light
            }`,
          '& .card-media': {
            transform: 'scale(1.1)',
          },
        },
        '&:active': {
          transform: 'scale(0.98) translateY(0)',
        },
      }}
    >
      {/* --- HEADER --- */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 1, // 8px padding
        }}
      >
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
          #{String(id).padStart(3, '0')}
        </Typography>
        <IconButton
          aria-label="Marcar como favorito"
          onClick={handleFavoriteClick}
          size="small"
        >
          <StarIcon
            fontSize="small"
            sx={{
              transition: 'color 0.2s',
              color: favorite ? 'warning.main' : 'action.disabled',
            }}
          />
        </IconButton>
      </Box>

      {/* --- BODY --- */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 1 }}>
        <CardMedia
          component="img"
          image={image}
          alt={`Imagen de ${name}`}
          className="card-media"
          sx={{
            height: 120,
            width: 120,
            objectFit: 'contain',
            transition: 'transform 0.35s ease-in-out',
          }}
          loading="lazy"
        />
        <Typography
          variant="h6"
          component="h2"
          sx={{
            textTransform: 'capitalize',
            fontWeight: 'bold',
            mt: 2, // 16px margin-top
          }}
        >
          {name}
        </Typography>
      </Box>

      {/* --- FOOTER --- */}
      <CardContent sx={{ pt: 1, pb: '16px !important' }}>
        <Stack direction="row" spacing={1} justifyContent="center">
          {types.map((typeInfo) => (
            <Chip
              key={typeInfo.type.name}
              label={typeInfo.type.name}
              size="small"
              sx={{ textTransform: 'capitalize' }}
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

PokemonCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  favorite: PropTypes.bool.isRequired,
  index: PropTypes.number,
};

export default PokemonCard;