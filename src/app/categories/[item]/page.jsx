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
  const {
    isLoading,
    isFetching,
    isError,
    refetch,
    data = [],
    error,
  } = useQuery({
    queryKey: ["/products/myp"],
    queryFn: () =>
      fetch(
        `https://64e45121c55563802913014d.mockapi.io/user/v1/${selectedValue}`
      )
        .then((res) => res.json())
        .then((data) => data),
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
  if (isLoading || isFetching) {
    return <Spinner />;
  }
  if (isError) return "Something went wrong";
  return (
    <div className="mx-auto my-3 md:my-8 max-w-7xl">
      <div className="flex justify-between">
        <div className="flex items-center gap-2 px-3">
          <h2>
            <span className="mb-3 text-xl font-semibold text-black">
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
                className="absolute bottom-0 left-0 text-black bg-white"
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
          <p className="text-xl font-semibold">Filter:</p>
          
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
            className="relative h-10 px-2 font-thin text-white bg-indigo-500 shadow-lg cursor-pointer rounded-xl focus:outline-0"
            type="select"
            name=""
          >
            {brands?.map((r, i) => (
              <option
                className="absolute bottom-0 left-0 p-2 text-black bg-white"
                key={i}
                value={r}
              >
                {r.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 px-4 my-10 sm:grid-cols-2 lg:grid-cols-4 md:gap-6 md:px-0">
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