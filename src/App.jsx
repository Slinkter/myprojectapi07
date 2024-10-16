import React from "react";
import logopokemon from "./assets/logo.svg";
import {
    Card,
    CardBody,
    CardHeader,
    Input,
    Typography,
} from "@material-tailwind/react";

function App() {
    return (
        <div className="min-h-dvh  w-full p-2 flex flex-col items-center gap-6 bg-green-100">
            {/* Header */}
            <section className="flex flex-col justify-center item-center w-3/4   ">
                <div className="border-2 mb-2">
                    <img src={logopokemon} alt="" />
                </div>

                <div className="border-2 mb-2 w-72 ">
                    <Input color="purple" label="ingresar pokemon" />
                </div>
            </section>
            {/* Body */}
            <section className="border-2 w-3/4">
                <span>Loading</span>
                <ul>
                    <li className="m-2">
                        <Card
                            shadow={false}
                            className="relative grid h-[24rem] w-full max-w-72 items-end justify-center overflow-hidden text-center"
                        >
                            <CardHeader
                                className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')] bg-cover bg-center"
                                floated={false}
                                shadow={false}
                            >
                                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
                            </CardHeader>
                            <CardBody className="relative py-14 px-6 md:px-12">
                                <Typography
                                    variant="h5"
                                    color="white"
                                    className="mb-6 font-medium leading-[1.5]"
                                >
                                    How we design and code open-source projects?
                                </Typography>
                                <Typography
                                    variant="h5"
                                    className="mb-4 text-gray-400"
                                >
                                    Tania Andrew
                                </Typography>
                            </CardBody>
                        </Card>
                    </li>
                    <li> pokemon 2</li>
                    <li> pokemon 3</li>
                </ul>
            </section>
        </div>
    );
}

export default App;
