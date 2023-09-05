import Image from "next/image";
import Link from "next/link";
import React from "react";

const Categories = () => {
  return (
    <div className="mx-2 my-5 mb-10 flex flex-col items-center">
      <h1 className="mb-3 text-4xl font-bold text-center text-black">
        Choose Your <span className="text-indigo-500">Category</span>
      </h1>
      <p className="mb-20 text-center text-lg font-semibold text-slate-600">
        Find Your Product by Select Your Category like Gaming PC, Gaming Phone
        Or Gaming Laptop
      </p>
      <div className="grid md:grid-cols-3 grid-cols-1 sm:grid-cols-2 md:gap-20 gap-8 md:w-3/4 md:mx-auto ">
        <div className="w-80 h-48 p-5 rounded-xl border border-black relative bg-[url('https://live.staticflickr.com/65535/52522584794_4a9898a992_o.jpg')] bg-contain transition duration-200 ease-in md:hover:scale-105">
          <div
            className={`absolute inset-0 bg-black opacity-50 rounded-xl`}
          ></div>
          <div className="absolute inset-0 p-5 flex flex-col items-center rounded-xl text-white">
            <h1 className="text-2xl mb-2 font-bold text-center">Gaming PC</h1>
            <p className="font-semibold">
              Explore Intel or Amd for better experience
            </p>
            <Link
              href={`/categories/gamingpc`}
              className="p-2 px-4 mt-5 rounded-lg font-semibold text-center outline outline-1 w-full transition duration-200 ease-in hover:bg-indigo-400 hover:outline-none"
            >
              View
            </Link>
          </div>
        </div>
        <div className="w-80 h-48 p-5 rounded-xl flex flex-col items-center bg-contain border border-black relative bg-[url('https://i.ibb.co/W6yVbs5/asus-rog-7.png')] transition duration-200 ease-in md:hover:scale-105">
          <div
            className={`absolute inset-0 bg-black opacity-50 rounded-xl`}
          ></div>
          <div className="absolute inset-0 p-5 flex flex-col items-center rounded-xl text-white">
            <h1 className="text-2xl mb-2 font-bold text-center">
              Gaming Phone
            </h1>
            <p className="font-semibold">
              Explore Gaming Beast With ASUS, Motorola etc.
            </p>
            <Link
              href={`/categories/phones`}
              className="p-2 px-4 mt-5 rounded-lg font-semibold text-center outline outline-1 w-full transition duration-200 ease-in hover:bg-indigo-400 hover:outline-none"
            >
              View
            </Link>
          </div>
        </div>
        <div className="w-80 h-48 p-5 rounded-xl flex flex-col items-center bg-contain border border-black relative transition duration-200 ease-in md:hover:scale-105 bg-[url('/gaminglaptop.png')]">
          <div
            className={`absolute inset-0 bg-black opacity-50 rounded-xl`}
          ></div>
          <div className="absolute inset-0 p-5 flex flex-col items-center rounded-xl text-white">
            <h1 className="text-2xl mb-2 font-bold text-center">
              Gaming Phone
            </h1>
            <p className="font-semibold">
              Explore Gaming Beast With ASUS, Motorola etc.
            </p>
            <Link
              href={`/categories/laptop`}
              className="p-2 px-4 mt-5 rounded-lg font-semibold text-center outline outline-1 w-full transition duration-200 ease-in hover:bg-indigo-400 hover:outline-none"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
