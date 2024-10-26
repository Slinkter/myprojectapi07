import React from "react";

const Web3Card = ({ handle, title, description, image }) => (
    <div className="max-w-sm rounded shadow-lg m-4">
        <img className="w-full" src={image} alt={`@${handle}`} />
        <div className="px-6 py-4">
            <p className="text-gray-700 text-base font-light flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                >
                    <path d="M5.566 4.657A4.505 4.505 0 0 1 6.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0 0 15.75 3h-7.5a3 3 0 0 0-2.684 1.657ZM2.25 12a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3v-6ZM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 0 1 6.75 6h10.5a3 3 0 0 1 2.683 1.657A4.505 4.505 0 0 0 18.75 7.5H5.25Z"></path>
                </svg>
                Collection
            </p>
            <h4 className="font-bold text-2xl leading-tight text-gray-900 flex items-center gap-2">
                {title}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-blue-500"
                >
                    <path
                        fillRule="evenodd"
                        d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                        clipRule="evenodd"
                    ></path>
                </svg>
            </h4>
            <p className="text-gray-700 text-base">{description}</p>
        </div>
    </div>
);

const Web3TrendingCollections = () => {
    const collections = [
        {
            handle: "thedreamytrees",
            title: "Dreamy Trees",
            description:
                "Website visitors today demand a frictionless user experience.",
            nfts: 9999,
            image: "https://www.material-tailwind.com/img/avatar1.jpg",
        },
        {
            handle: "3dfaces",
            title: "Face NFTs",
            description:
                "Website visitors today demand a frictionless user experience.",
            nfts: 3000,
            image: "https://www.material-tailwind.com/image/avatar2.jpg",
        },
        {
            handle: "theplanetsoftheuniverse",
            title: "The Planets Of The Universe",
            description:
                "Website visitors today demand a frictionless user experience.das dasdas dsadsadsadsadsarictionless user experience.das dasdas dsadsadsadsadsa",
            nfts: 9999,
            image: "https://www.material-tailwind.com/img/avatar3.jpg",
        },
    ];

    return (
        <div className="flex flex-wrap justify-center">
            {collections.map((collection, index) => (
                <Web3Card key={index} {...collection} />
            ))}
        </div>
    );
};

export default Web3TrendingCollections;
