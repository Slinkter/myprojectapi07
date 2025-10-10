import React, { useEffect } from "react";
import logopokemon from "../../assets/logo.svg";
import { Typography, List, ListItem } from "@material-tailwind/react"; // Added List, ListItem
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchPokemons } from "../../features/pokemon/pokemonSlice";
import { PokemonSkeleton } from "../../components/ui/PokemonSkeleton";
import { PokemonList } from "../../components/pokemon/PokemonList";
import { SearchPokemon } from "../../components/SearchPokemon";

// Renamed from App to HomePage
function HomePage() {
    /*  */
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.ui.loading);
    const pokemons = useSelector((state) => state.pokemon.pokemons, shallowEqual);

    useEffect(() => {
        dispatch(fetchPokemons());
    }, [dispatch]);

    const pokemonsfav = pokemons.filter((x) => x.favorite === true);

    /**
     * @typedef {Object} HomePageProps
     * @description Props for the HomePage component.
     */

    /**
     * HomePage component displays a list of Pokemon, a search bar, and favorite Pokemon.
     * It fetches Pokemon data on mount and manages loading/error states.
     * @param {HomePageProps} props - The component props.
     * @returns {JSX.Element} The HomePage component.
     */

    return (
        <div className="min-h-screen w-full p-4 flex flex-col items-center gap-6 bg-gray-100 dark:bg-gray-900"> {/* Added dark mode support */}
            {/* Header */}

            {/* Body */}
            <section className="w-full md:w-3/4">
                {loading ? (
                    <>
                        <PokemonSkeleton />
                    </>
                ) : (
                    <>
                        <section className="flex flex-col justify-center items-center w-full ">
                            <Typography variant="h1">
                                React + Redux + Axios + Material-Tailwindcss
                            </Typography>
                            <Typography variant="h3">API Pokemons</Typography>
                            <div className="mb-4 h-10">
                                <img
                                    src={logopokemon}
                                    alt="Logo Pokémon"
                                    className="w-56 h-auto"
                                />
                            </div>

                            <div className="mt-4 mb-4 w-full md:w-72">
                                <SearchPokemon /> {/* Renamed component */}
                            </div>
                        </section>
                        <section className="flex flex-col justify-center items-center mb-4">
                            <Typography variant="h2"> Favorites </Typography>
                            <List className="flex-row"> {/* Changed to Material Tailwind List */}
                                {pokemonsfav.map((fav) => (
                                    <ListItem key={fav.id} className="w-auto"> {/* Changed to Material Tailwind ListItem */}
                                        <Typography variant="paragraph">
                                            {fav.name}
                                        </Typography>
                                    </ListItem>
                                ))}
                            </List>
                        </section>
                        <PokemonList pokemons={pokemons} /> {/* PokemonList is now a widget */}
                    </>
                )}
            </section>
        </div>
    );
}
