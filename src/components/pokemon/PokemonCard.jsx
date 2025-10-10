import { memo } from "react";
import PropTypes from "prop-types";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { useFavorites } from "../../hooks/useFavorites";

export const PokemonCard = memo(({ pokemon }) => {
    const { toggleFavorite } = useFavorites();

    return (
        <Card className="w-96 animate-in fade-in duration-500 hover:shadow-lg transition-shadow">
            <CardHeader floated={false} className="h-80">
                <img
                    className="h-full w-full object-contain"
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    loading="lazy"
                />
            </CardHeader>
            <CardBody className="text-center">
                <Typography
                    variant="h4"
                    color="blue-gray"
                    className="mb-2 capitalize font-inter"
                >
                    {pokemon.name}
                </Typography>
                <Typography
                    color="blue-gray"
                    className="font-medium font-inter"
                    textGradient
                >
                    {pokemon.types.map((x) => x.type.name).join(", ")}
                </Typography>
            </CardBody>
            <CardFooter className="flex justify-center gap-7 pt-2">
                <IconButton
                    variant="text"
                    color={pokemon.favorite ? "amber" : "blue-gray"}
                    onClick={() => toggleFavorite(pokemon.id)}
                    className="transition-colors duration-300"
                >
                    {pokemon.favorite ? (
                        <FaStar size="1.25rem" />
                    ) : (
                        <FaRegStar size="1.25rem" />
                    )}
                </IconButton>
            </CardFooter>
        </Card>
    );
});

PokemonCard.propTypes = {
    pokemon: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        sprites: PropTypes.shape({
            front_default: PropTypes.string.isRequired,
        }).isRequired,
        types: PropTypes.arrayOf(
            PropTypes.shape({
                type: PropTypes.shape({
                    name: PropTypes.string.isRequired,
                }).isRequired,
            })
        ).isRequired,
        favorite: PropTypes.bool.isRequired,
    }).isRequired,
};

PokemonCard.displayName = "PokemonCard";
