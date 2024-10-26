import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
    IconButton,
} from "@material-tailwind/react";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { setFavorite } from "../reducer/slice/dataSlice";

const PokemonCard = ({ pokemon }) => {
    const dispatch = useDispatch();

    const btnFavPokemon = () => {
        dispatch(setFavorite({ pokemonId: pokemon.id }));
    };

    return (
        <>
            <Card className="w-96">
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
                    <Typography
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

export default PokemonCard;
