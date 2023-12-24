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
    if (search) {
      setSelectedText(search);
      setSearchResult(matchItems);
    } else {
      setSelectedText("");
      setSelectedItem({});
    }
    setClicked(false);
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
        className={`absolute inset-0 bg-black opacity-70 rounded-b-2xl`}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-10 px-2">
          <div>
            <h1 className="mb-2 text-6xl font-bold text-center drop-shadow-md">
              Explore Today's <span className="text-indigo-400">Gadgets</span>
            </h1>
            <p className="mx-auto text-xl font-semibold text-center opacity-80">
              Experience into the World of Innovation, Navigating the Complex
              World of Tech & the Cutting-Edge Tech World
            </p>
          </div>
          <form
            onSubmit={handleSearch}
            className="relative flex flex-col items-center w-3/4 gap-3"
          >
            <span className="absolute top-4 left-2">
              <HiSearch className="text-black opacity-60" />
            </span>
            <input
              type="text"
              name="search"
              placeholder="Let's Search a Product"
              className="w-full py-3 mb-4 font-semibold text-black rounded-lg shadow-md outline-indigo-300 md:px-10 px-7 shadow-indigo-400"
              id=""
              value={selectedText}
              onChange={handleOnChange}
            />
            <div
              className={`w-full top-16 absolute bg-white text-black rounded-lg z-50 ${
                searchResult && !clicked && selectedText ? "" : "hidden"
              }`}
            >
              {searchResult?.slice(0, 3).map((s, key) => (
                <div
                  key={key}
                  className="p-2 py-3 rounded-lg cursor-pointer bg-slate-100 hover:bg-slate-200"
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
              <span className="ml-1 text-xl">
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
