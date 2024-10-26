import React, { useEffect } from "react";
import logopokemon from "./assets/logo.svg";
import { Input, Typography } from "@material-tailwind/react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import fetchPokemon from "./api/fetchPokemon";
import SpinnerLoading from "./components/SpinnerLoading";
import PokemonList from "./components/PokemonList";
import SearchPokemon from "./components/SearchPokemon";

function App() {
    /*  */
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.ui.loading);
    const error = useSelector((state) => state.ui.error);
    const pokemons = useSelector((state) => state.data.pokemons, shallowEqual);

    useEffect(() => {
        dispatch(fetchPokemon());
    }, [dispatch]);

    const pokemonsfav = pokemons.filter((x) => x.favorite === true);
    console.log(pokemonsfav);

    return (
        <div className="min-h-screen w-full p-4 flex flex-col items-center gap-6 bg-gray-100">
            {/* Header */}

            {/* Body */}
            <section className="w-full md:w-3/4">
                {loading ? (
                    <>
                        <SpinnerLoading />
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
                                <SearchPokemon />
                            </div>
                        </section>
                        <section className="flex flex-col justify-center items-center mb-4">
                            <Typography variant="h2"> Favorites </Typography>
                            <ul>
                                {pokemonsfav.map((fav) => (
                                    <li key={fav.id}>
                                        <Typography variant="paragraph">
                                            {fav.name}
                                        </Typography>
                                    </li>
                                ))}
                            </ul>
                        </section>
                        <PokemonList pokemons={pokemons} />

                        {}
                    </>
                )}
            </section>
        </div>
    );
}

export default App;
