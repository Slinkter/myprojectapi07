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
import { useDispatch } from "react-redux";
import { setFavorite } from "./features/pokemon/pokemonSlice"; // Corrected path
import PropTypes from "prop-types";

/**
 * @typedef {Object} PokemonCardProps
 * @property {Object} pokemon - The pokemon object to display.
 * @property {number} pokemon.id - The unique ID of the pokemon.
 * @property {string} pokemon.name - The name of the pokemon.
 * @property {Object} pokemon.sprites - The sprites object containing image URLs.
 * @property {string} pokemon.sprites.front_default - The URL for the default front sprite.
 * @property {Array<Object>} pokemon.types - An array of type objects for the pokemon.
 * @property {Object} pokemon.types.type - The type object.
 * @property {string} pokemon.types.type.name - The name of the pokemon's type.
 * @property {boolean} pokemon.favorite - Indicates if the pokemon is marked as favorite.
 */

/**
 * PokemonCard component displays a single Pokemon with its image, name, types, and a favorite button.
 * @param {PokemonCardProps} props - The component props.
 * @returns {JSX.Element} The PokemonCard component.
 */
const PokemonCard = ({ pokemon }) => {
    const dispatch = useDispatch();

    const btnFavPokemon = () => {
        dispatch(setFavorite({ pokemonId: pokemon.id }));
    };

    return (
        <>
            <Card className="w-96 shadow-lg hover:shadow-xl transition-shadow duration-300">
                {" "}
                {/* Added hover effect */}
                <CardHeader floated={false} className="h-80">
                    <img
                        className="h-full w-full"
                        src={pokemon.sprites.front_default}
                        alt={pokemon.name}
                    />
                </CardHeader>
                <CardBody className="text-center">
                    <Typography variant="h4" color="blue-gray" className="mb-2">
                        {pokemon.name}
                    </Typography>
                    <Typography // Suggestion: Consider a dedicated TypeBadge component for better reusability and styling
                        color="blue-gray"
                        className="font-medium"
                        textGradient
                    >
                        {pokemon.types.map((x) => x.type.name).join(",")}
                    </Typography>
                </CardBody>
                <CardFooter className="flex justify-center gap-7 pt-2  ">
                    {pokemon.favorite ? (
                        <IconButton
                            variant="text"
                            color="amber"
                            onClick={() => btnFavPokemon()}
                        >
                            <FaStar size={"lg"} className="" />
                        </IconButton>
                    ) : (
                        <IconButton
                            variant="text"
                            onClick={() => btnFavPokemon()}
                        >
                            <FaRegStar size={"lg"} />
                        </IconButton>
                    )}
                </CardFooter>
            </Card>
        </>
    );
};

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
        favorite: PropTypes.bool,
    }).isRequired,
};

export default PokemonCard;
