/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { HiArrowCircleRight } from "react-icons/hi";

import {
  HiArrowNarrowRight,
  HiOutlineCurrencyBangladeshi,
} from "react-icons/hi";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AIComparison from "@/components/AIComparison";

const page = ({ params }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedImg, setSelectedImg] = useState("");
  const currentPath = usePathname().includes("phones");
  const user =
    typeof window !== "undefined" && JSON.parse(localStorage.getItem("status"));
  const { isLoading, isError, data, error } = useQuery({
    queryKey: [`/products/${params.id}`],
    queryFn: () =>
      fetch(
        `https://64e45121c55563802913014d.mockapi.io/user/v1/${params.item}/${params.id}`
      )
        .then((res) => res.json())
        .then((data) => data),
  });
  const { id, image, model, price, keyFeature, rating, spec, brand } =
    data || [];
  const { data: products, isLoading: otherLoading } = useQuery({
    queryKey: ["all"],
    queryFn: () =>
      fetch(
        `https://64e45121c55563802913014d.mockapi.io/user/v1/${params.item}`
      )
        .then((res) => res.json())
        .then((data) => data),
  });

  const result = products?.filter(
    (product) => product.brand === brand && product.model !== model
  );
  const selectedProduct = result?.filter((p) => p.model === selectedValue)[0];
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
  const initialRows = () => {
    return (
      <>
        {Array.from({ length: 7 }).map((row, key) => (
          <tr key={key} className={`${key % 2 == 0 ? "bg-slate-200" : ""}`}>
            <th className="p-3 text-sm font-semibold text-white bg-slate-600"></th>
            <td className={`text-sm border border-indigo-500 p-7`}></td>
          </tr>
        ))}
      </>
    );
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <section className="px-8 mt-4 mb-14 ">
      <div className="flex flex-col justify-center p-2 py-4 rounded-lg md:flex-row md:gap-20 bg-slate-100 md:py-0">
        <div className="flex flex-col items-center justify-center mb-16 rounded-lg md:w-2/5">
          <Image
            src={selectedImg ? selectedImg : image}
            alt=""
            width={400}
            height={400}
            className="object-contain w-full p-6 rounded-lg aspect-square"
          />
          <div className="flex flex-wrap gap-2 bg-white rounded-md md:gap-4">
            {products?.slice(0, 3).map((p, key) => {
              return (
                <Image
                  src={p.image}
                  key={key}
                  alt="image"
                  width={100}
                  height={100}
                  className="w-20 h-20 transition duration-200 cursor-pointer md:w-32 hover:scale-110 opacity-70 hover:opacity-100"
                  onClick={() => setSelectedImg(p.image)}
                />
              );
            })}
          </div>
        </div>
        <div className="flex flex-col justify-center md:min-w-[400px]">
          <h1 className="mb-2 text-3xl font-bold">{model}</h1>

          <p className="flex items-center gap-1 text-lg font-bold">
            Rating: {ratingCount()}
          </p>
          <div className="my-10">
            <h2 className="mb-2 text-xl font-semibold">Key Features:</h2>
            <ul className="px-3 space-y-2">
              {keyFeature?.map((feature, i) => {
                return (
                  <>
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <span>
                        <HiArrowNarrowRight className="text-xl text-indigo-500" />
                      </span>
                      {feature}
                    </li>
                  </>
                );
              })}
            </ul>
          </div>
          <div className="flex flex-col w-full gap-3 md:flex-row md:justify-between">
            <h2 className="flex items-center gap-1 text-xl">
              <HiOutlineCurrencyBangladeshi className="text-2xl" />
              <p className="text-2xl font-bold">{price}</p> BDT
            </h2>
            <Link
              className="flex items-center justify-between gap-3 p-2 px-4 font-semibold text-white transition duration-300 bg-indigo-400 rounded-xl hover:scale-105 hover:bg-indigo-500"
              href={`#compare`}
            >
              Lets Compare
              <span>
                <HiArrowCircleRight />
              </span>
            </Link>
          </div>
        </div>
      </div>
      <p className="p-2 mx-auto mt-16 mb-8 font-semibold text-center bg-indigo-200 whitespace-nowrap md:text-3xl md:w-1/3 rounded-xl">
        Lets Compare With others
      </p>

      {/* AI Comparison Section */}
      <AIComparison currentProduct={data} selectedProduct={selectedProduct} />

      <div className="relative">
        <div
          className={`h-full flex items-center justify-center absolute inset-0 bg-slate-100 blur-sm opacity-80 ${
            user && "hidden"
          }`}
        ></div>
        <Link
          href={`/login`}
          className={`bg-indigo-400 p-3 px-5 rounded-md text-white font-medium z-50 absolute md:top-1/2 md:right-[45%] top-1/3 right-1/4 hover:scale-105 transition-all duration-150 shadow-md shadow-slate-400 hover:bg-indigo-500 ${
            user && "hidden"
          }`}
        >
          SignIn To Go Ahead
        </Link>
        <div>
          <div
            className={`md:flex justify-end mt-2 max-w-screen-xl mx-auto hidden ${
              !user ? "blur-sm" : "blur-none"
            }`}
          >
            <select
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
              className="w-20 h-10 p-1 font-thin rounded-md shadow-lg cursor-pointer md:w-40 outline outline-1 outline-indigo-400"
              type="select"
              name=""
            >
              <option value="" className="">
                Choose Product
              </option>
              {result?.map((r, i) => (
                <option className="" key={i} value={r.model}>
                  {r.model}
                </option>
              ))}
            </select>
          </div>
          <div className="max-w-screen-xl mx-auto mt-6">
            <div
              className={`flex md:flex-row flex-col md:items-start items-center  justify-center md:px-0 ${
                currentPath ? "md:gap-20" : "md:gap-10"
              }`}
              id="compare"
            >
              <div className={`${!user ? "blur-sm" : "blur-none"} `}>
                <table className="w-full border border-indigo-500 shadow-xl md:shadow-gray-300">
                  <tbody>
                    <tr>
                      <th className="p-1 text-sm text-center border border-indigo-500 md:p-3">
                        Model
                      </th>
                      <td className="text-sm p-3 border border-indigo-500 text-center font-bold md:min-w-[400px]">
                        {model}
                      </td>
                    </tr>
                    {spec?.map((s, i) => {
                      return (
                        <tr
                          key={i}
                          className={`${i % 2 == 0 ? "bg-slate-200" : ""}`}
                        >
                          <th className="p-1 text-xs font-semibold text-white bg-slate-600 md:p-3 md:text-sm">
                            {Object.keys(s)[0].toUpperCase()}
                          </th>
                          <td className="p-3 text-sm border border-indigo-500">
                            {Object.values(s)[0]}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-center">
                <Image src={`/vs.png`} alt="" width={200} height={200} />
              </div>
              <div className={`${!user ? "blur-sm" : "blur-none"} `}>
                <div
                  className={`flex justify-end mt-2 max-w-screen-xl mx-auto md:hidden ${
                    !user ? "blur-sm" : "blur-none"
                  }`}
                >
                  <select
                    value={selectedValue}
                    onChange={(e) => setSelectedValue(e.target.value)}
                    className="w-1/3 h-10 p-1 font-thin rounded-md shadow-lg cursor-pointer md:w-40 outline outline-1 outline-indigo-400"
                    type="select"
                    name=""
                  >
                    <option value="" className="">
                      Choose Product
                    </option>
                    {result?.map((r, i) => (
                      <option className="" key={i} value={r.model}>
                        {r.model}
                      </option>
                    ))}
                  </select>
                </div>
                <table className="w-full mt-5 border border-indigo-500 shadow-xl md:mt-0 md:shadow-gray-300">
                  <tbody className="">
                    <tr>
                      <th className="p-3 text-sm text-center border border-indigo-500">
                        Model
                      </th>
                      <td className="text-sm p-3 border border-indigo-500 text-center font-bold md:min-w-[400px]">
                        {selectedValue ? selectedValue : "Product Name"}
                      </td>
                    </tr>

                    {selectedProduct
                      ? selectedProduct?.spec.map((s, i) => {
                          return (
                            <tr
                              key={i}
                              className={`${i % 2 == 0 ? "bg-slate-200" : ""}`}
                            >
                              <th className="p-3 text-sm font-semibold text-white bg-slate-600">
                                {Object.keys(s)[0].toUpperCase()}
                              </th>
                              <td
                                className={`text-sm p-3 border border-indigo-500`}
                              >
                                {Object.values(s)[0]}
                              </td>
                            </tr>
                          );
                        })
                      : initialRows()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;