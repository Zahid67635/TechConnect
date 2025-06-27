/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import ProductCard from "@/components/ProductCard";
import Spinner from "@/components/Spinner";
import Loading from "@/components/loading";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
const page = ({ params }) => {
  const categoryName = params.item;
  const [filterProducts, setFilterProducts] = useState([]);
  const [selectedValue, setSelectedValue] = useState(params.item);
  const [selectedBrand, setSelectedBrand] = useState("");
  const categories = ["gamingpc", "phones", "laptop"];
  const router = useRouter();
  const brands = ["all", "intel", "amd"];
  const { isLoading, isError, refetch, data = [], error } = useQuery({
    queryKey: ["/products/myp", selectedValue],
    queryFn: () => {
      const jsonFile = selectedValue === 'phones' ? '/phone.json' : '/products.json';
      return fetch(jsonFile)
        .then((res) => res.json())
        .then((data) => data);
    },
    enabled: selectedValue !== "laptop",
  });
  console.log(data.length);
  const handleFilter = (brandName) => {
    const filterItem = data?.filter((product) => product.brand === brandName);
    setFilterProducts(filterItem);
  };

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };
  console.log(data);
  useEffect(() => {
    if (selectedValue) {
      router.push(`/categories/${selectedValue}`);
    }
    refetch();
  }, [router, selectedValue]);
  if (isLoading) {
    return <Spinner />;
  }
  if (isError) return "Something went wrong";
  return (
    <div className="md:my-8 my-3 max-w-7xl mx-auto">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center px-3">
          <h2>
            <span className="text-black font-semibold text-xl mb-3">
              Category:
            </span>
          </h2>
          <select
            value={selectedValue}
            onChange={(e) => handleChange(e)}
            className={`relative h-10 rounded-xl p-1 font-thin bg-indigo-500 cursor-pointer shadow-lg text-white px-2 selectSelected`}
            type="select"
            name=""
          >
            {categories?.map((r, i) => (
              <option
                className="absolute bottom-0 left-0 bg-white text-black"
                key={i}
                value={r}
              >
                {r.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        <div
          className={`flex md:flex-row sm:flex-col gap-3 mr-2 items-center ${
            categoryName !== "gamingpc" ? "hidden" : ""
          }`}
        >
          <p className="font-semibold text-xl">Filter:</p>
          {/* <button
            onClick={() => {
              setFilterProducts([]);
              setAll(true);
              setIntel(false);
              setAmd(false);
            }}
            className={`px-3 py-1 text-black rounded-lg font-semibold shadow-lg hover:drop-shadow-xl ${
              all ? "bg-indigo-400 text-white" : ""
            }`}
          >
            ALL
          </button>
          <button
            onClick={() => {
              handleFilter("INTEL");
              setAll(false);
              setIntel(true);
              setAmd(false);
            }}
            className={`px-3 py-1 text-black rounded-lg font-semibold shadow-lg hover:drop-shadow-xl ${
              intel ? "bg-indigo-400 text-white" : ""
            }`}
          >
            INTEL
          </button>
          <button
            onClick={() => {
              handleFilter("AMD");
              setAll(false);
              setIntel(false);
              setAmd(true);
            }}
            className={`px-3 py-1 text-black rounded-lg font-semibold shadow-lg hover:drop-shadow-xl ${
              amd ? "bg-indigo-400 text-white" : ""
            }`}
          >
            AMD
          </button> */}
          <select
            value={selectedBrand}
            onChange={(e) => {
              setSelectedBrand(e.target.value);
              if (e.target.value === "amd") {
                handleFilter("AMD");
              } else if (e.target.value === "intel") {
                handleFilter("INTEL");
              } else {
                setFilterProducts([]);
              }
            }}
            className="relative h-10 rounded-xl px-2 font-thin bg-indigo-500 cursor-pointer shadow-lg text-white focus:outline-0"
            type="select"
            name=""
          >
            {brands?.map((r, i) => (
              <option
                className="absolute bottom-0 left-0 bg-white text-black p-2"
                key={i}
                value={r}
              >
                {r.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 my-10 gap-4 md:gap-6 md:px-0 px-4">
        {data?.length > 0 ? (
          filterProducts?.length > 0 ? (
            filterProducts?.map((product) => (
              <ProductCard
                key={product.id}
                category={params.item}
                product={product}
              />
            ))
          ) : data?.length < 0 || data === "Not found" ? (
            <p className="text-2xl font-bold">No data Found!!</p>
          ) : (
            data?.map((product) => (
              <ProductCard
                key={product.id}
                category={params.item}
                product={product}
              />
            ))
          )
        ) : (
          <>
            <Loading />
            <Loading />
            <Loading />
            <Loading />
          </>
        )}
      </div>
    </div>
  );
};

export default page;