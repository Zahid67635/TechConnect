"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa";
import {
  HiArrowCircleRight,
  HiOutlineCurrencyBangladeshi,
} from "react-icons/hi";
const ProductCard = ({ product, category }) => {
  const { id, image, model, price, keyFeature, rating } = product;
  const categoryName = category.replace("%20", "");
  const ratingCount = () => {
    return (
      <>
        {Array.from({ length: 5 }).map((star, key) => (
          <FaStar
            key={key}
            className={`${
              key + 1 <= rating ? "text-orange-400" : "text-gray-300"
            } w-5 h-5`}
          />
        ))}
      </>
    );
  };
  return (
    <div className="shadow gap-3 border border-gray-200 rounded-3xl p-4 flex flex-col text-indigo-900 relative transition duration-300 ease-in-out md:hover:scale-105 hover:shadow-lg">
      <span className="absolute top-4 right-5 px-2 py-1 text-xs text-center uppercase whitespace-no-wrap origin-bottom-left transform -translate-y-full translate-x-1/3 bg-sky-600 rounded-lg text-white">
        {categoryName}
      </span>
      <div className="h-48 mx-auto">
        <Image
          src={image}
          alt={product.model}
          width={320}
          height={208}
          className="h-full aspect-square w-full object-cover"
        />
      </div>
      <div className="flex items-center justify-between">
        <h1 className="font-bold line-clamp-1 mr-1">{model}</h1>
        <span className="flex items-center font-semibold">
          <span className="mr-1">({rating})</span>
          {ratingCount()}
        </span>
      </div>
      <div className="flex-1">
        <ul className="space-y-2">
          {keyFeature.slice(0, 2).map((feature, i) => {
            return (
              <li key={i} className="text-sm ">
                {feature}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex items-center justify-between gap-2 mt-5">
        <p className="flex items-center gap-1 text-xl font-bold">
          <span>
            <HiOutlineCurrencyBangladeshi className="text-3xl" />
          </span>
          {price}
        </p>
        <Link
          href={`/categories/${category}/${id}`}
          className="bg-indigo-400 rounded-full py-2 px-4 gap-3  text-white text-bold font-semibold flex text-center justify-between w-fit items-center transition duration-200 ease-in hover:bg-indigo-500 hover:scale-105"
        >
          Details{" "}
          <span>
            <HiArrowCircleRight className="text-xl" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
