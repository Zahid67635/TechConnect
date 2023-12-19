import Link from "next/link";
import React from "react";

const CategoryCard = ({ data }) => {
  const { image, path, name } = data;
  return (
    <div
      className={`w-80 h-48 p-5 rounded-xl border border-black relative bg-contain transition duration-200 ease-in md:hover:scale-105`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className={`absolute inset-0 bg-black opacity-50 rounded-xl`}></div>
      <div className="absolute inset-0 flex flex-col items-center p-5 text-white rounded-xl">
        <h1 className="mb-2 text-2xl font-bold text-center">{name}</h1>
        <p className="font-semibold">
          Explore Intel or Amd for better experience
        </p>
        <Link
          href={`${path}`}
          className="w-full p-2 px-4 mt-5 font-semibold text-center transition duration-200 ease-in rounded-lg outline outline-1 hover:bg-indigo-400 hover:outline-none"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;
