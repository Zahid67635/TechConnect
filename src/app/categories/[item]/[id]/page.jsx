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

const page = ({ params }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedImg, setSelectedImg] = useState("");
  const currentPath = usePathname().includes("phones");
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
        {Array.from({ length: 6 }).map((row, key) => (
          <tr key={key} className={`${key % 2 == 0 ? "bg-slate-200" : ""}`}>
            <th className="bg-slate-600 text-white p-3 text-sm font-semibold"></th>
            <td className={`text-sm border border-indigo-500 p-5`}></td>
          </tr>
        ))}
      </>
    );
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <section className="mt-4 px-8 mb-14 ">
      <div className="flex md:flex-row flex-col md:gap-20 justify-center bg-slate-100 p-2 rounded-lg md:py-0 py-4">
        <div className="md:w-2/5 flex flex-col justify-center items-center mb-16 rounded-lg">
          <Image
            src={selectedImg ? selectedImg : image}
            alt=""
            width={400}
            height={400}
            className="w-full object-contain aspect-square p-6 rounded-lg"
          />
          <div className="flex md:gap-4 gap-2 bg-white rounded-md flex-wrap">
            {products?.slice(0, 3).map((p, key) => {
              return (
                <Image
                  src={p.image}
                  key={key}
                  alt="image"
                  width={100}
                  height={100}
                  className="w-32 h-20 transition duration-200 hover:scale-110 opacity-70 hover:opacity-100 cursor-pointer"
                  onClick={() => setSelectedImg(p.image)}
                />
              );
            })}
          </div>
        </div>
        <div className="flex flex-col justify-center md:min-w-[400px]">
          <h1 className="text-3xl font-bold mb-2">{model}</h1>

          <p className="text-lg font-bold flex gap-1 items-center">
            Rating: {ratingCount()}
          </p>
          <div className="my-10">
            <h2 className="text-xl font-semibold mb-2">Key Features:</h2>
            <ul className="space-y-2 px-3">
              {keyFeature?.map((feature, i) => {
                return (
                  <>
                    <li key={i} className="text-sm flex items-center gap-2">
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
          <div className="flex justify-between w-full">
            <h2 className="text-xl flex gap-1 items-center">
              <HiOutlineCurrencyBangladeshi className="text-2xl" />
              <p className="text-2xl font-bold">{price}</p> BDT
            </h2>
            <Link
              className="p-2 px-4 bg-indigo-400 text-white rounded-xl font-semibold transition duration-300 hover:scale-105 hover:bg-indigo-500 flex items-center gap-3"
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
      <p className="whitespace-nowrap font-semibold md:text-3xl p-2 text-center mt-16 md:w-1/3 mx-auto bg-indigo-200 rounded-xl mb-8">
        Lets Compare With others
      </p>
      <div>
        <div className="flex justify-end mt-2">
          <select
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
            className="relative md:w-40 w-20 h-10 rounded-md p-1 font-thin outline outline-1 outline-indigo-400 cursor-pointer shadow-lg"
            type="select"
            name=""
          >
            <option value="" className="absolute bottom-0 left-0">
              Choose Product
            </option>
            {result?.map((r, i) => (
              <option
                className="absolute bottom-0 left-0"
                key={i}
                value={r.model}
              >
                {r.model}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-6">
          <div
            className={`flex md:flex-row flex-col md:items-start items-center  justify-center md:px-0 ${
              currentPath ? "md:gap-20" : "md:gap-10"
            }`}
            id="compare"
          >
            <div>
              <table className="w-full shadow-xl md:shadow-gray-300 border border-indigo-500">
                <tbody>
                  <tr>
                    <th className="text-sm md:p-3 p-1 border border-indigo-500 text-center">
                      Model
                    </th>
                    <td className="text-sm md:p-3 p-1 border border-indigo-500 text-center font-bold md:min-w-[400px]">
                      {model}
                    </td>
                  </tr>
                  {spec?.map((s, i) => {
                    return (
                      <tr
                        key={i}
                        className={`${i % 2 == 0 ? "bg-slate-200" : ""}`}
                      >
                        <th className="bg-slate-600 text-white md:p-3 p-1 md:text-sm text-xs font-semibold">
                          {Object.keys(s)[0].toUpperCase()}
                        </th>
                        <td className="text-sm md:p-3 p-1 border border-indigo-500">
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
            <div>
              <table className="w-full shadow-xl md:shadow-gray-300 border border-indigo-500">
                <tbody className="">
                  <tr>
                    <th className="text-sm p-3 border border-indigo-500 text-center">
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
                            <th className="bg-slate-600 text-white p-3 text-sm font-semibold">
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
    </section>
  );
};

export default page;
