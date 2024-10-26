import React from "react";
import logopokemon from "./assets/logo.svg";
import { Input } from "@material-tailwind/react";

function App() {
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
                    <Input color="purple" label="Ingresar Pokémon" />
                </div>
            </section>
            {/* Body */}
            <section className="w-full md:w-3/4"></section>
        </div>
    );
}

export default App;
