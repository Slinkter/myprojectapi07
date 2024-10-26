import React, { useEffect } from "react";
import logopokemon from "./assets/logo.svg";
import { Input } from "@material-tailwind/react";
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

    console.log(loading);
    console.log(error);
    console.log(pokemons);

    useEffect(() => {
        dispatch(fetchPokemon());
    }, [dispatch]);

    return (
        <div className="min-h-screen w-full p-4 flex flex-col items-center gap-6 bg-gray-100">
            {/* Header */}
            <section className="flex flex-col justify-center items-center w-full md:w-3/4">
                <div className="mb-4">
                    <img
                        src={logopokemon}
                        alt="Logo Pokémon"
                        className="w-32 h-auto"
                    />
                </div>

                <div className="mb-4 w-full md:w-72">
                    <SearchPokemon />
                </div>
            </section>
            {/* Body */}
            <section className="w-full md:w-3/4">
                {loading ? (
                    <>
                        <SpinnerLoading />
                    </>
                ) : (
                    <>
                        <PokemonList pokemons={pokemons} />
                    </>
                )}
            </section>
        </div>
    );
}

export default App;
