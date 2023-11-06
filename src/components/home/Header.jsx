/* eslint-disable react/no-unescaped-entities */
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";
import { HiArrowCircleRight, HiSearch } from "react-icons/hi";
import Spinner from "../Spinner";
import { useRouter } from "next/navigation";

const Header = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [selectedText, setSelectedText] = useState("");
  const [selectedItem, setSelectedItem] = useState({});
  const [clicked, setClicked] = useState(false);
  const route = useRouter();

  const fetchData = () =>
    fetch(`https://64e45121c55563802913014d.mockapi.io/user/v1/gamingpc`)
      .then((res) => res.json())
      .then((data) => data);

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["phones"],
    queryFn: fetchData,
  });

  const handleOnChange = (e) => {
    const search = e.target.value.toLowerCase();
    const matchItems = data.filter((p) =>
      p.model.toLowerCase().includes(search)
    );
    if (!selectedText) {
      setSelectedItem({});
    }
    setSelectedText(search);
    setSearchResult(matchItems);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    if (selectedItem) {
      route.push(`/categories/gamingpc/${selectedItem.id}`);
    }
  };
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section
      className={`flex md:flex-row flex-col-reverse items-center mb-10 bg-[url('/myheader.png')] bg-cover bg-center relative md:h-[100vh] h-[80vh] text-white`}
    >
      <div
        className={`absolute inset-0 bg-black opacity-50 rounded-b-2xl`}
      ></div>
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="flex flex-col items-center px-2 gap-10">
          <div>
            <h1 className="text-6xl font-bold text-center drop-shadow-md mb-2">
              Explore Today's <span className="text-indigo-400">Gadgets</span>
            </h1>
            <p className="font-semibold text-xl mx-auto text-center opacity-80">
              Experience into the World of Innovation, Navigating the Complex
              World of Tech & the Cutting-Edge Tech World
            </p>
          </div>
          <form
            onSubmit={handleSearch}
            className="w-3/4 flex flex-col gap-3 items-center relative"
          >
            <span className="absolute top-4 left-2">
              <HiSearch className="text-black opacity-60" />
            </span>
            <input
              type="text"
              name="search"
              placeholder="Let's Search a Product"
              className="w-full py-3 outline-indigo-300 md:px-10 px-7 rounded-lg mb-4 shadow-indigo-400 shadow-md text-black font-semibold"
              id=""
              value={selectedText}
              onChange={handleOnChange}
            />
            <div
              className={`w-full top-16 absolute bg-white text-black rounded-lg z-50 ${
                searchResult && !clicked ? "" : "hidden"
              }`}
            >
              {searchResult?.slice(0, 3).map((s, key) => (
                <div
                  key={key}
                  className="bg-slate-100 cursor-pointer p-2 py-3 hover:bg-slate-200 rounded-lg"
                  onClick={() => {
                    setSelectedText(s.model);
                    setClicked(true);
                    setSelectedItem(s);
                  }}
                >
                  <p className="text-sm">{s.model}</p>
                </div>
              ))}
            </div>

            <button
              type="submit"
              className={`p-2 px-5 bg-indigo-500 rounded-md text-white font-semibold flex items-center transition duration-200 ease-in hover:bg-indigo-600 hover:scale-105 justify-center mx-auto ${
                selectedItem?.id === undefined
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              disabled={selectedItem?.id === undefined}
            >
              Search
              <span className="text-xl ml-1">
                <HiArrowCircleRight />
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

<div></div>;
export default Header;
