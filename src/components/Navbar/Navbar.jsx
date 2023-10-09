"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { HiMenu, HiX } from "react-icons/hi";
import Image from "next/image";
const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [change, setChange] = useState(false);
  const currentPath = usePathname();

  const userSting =
    typeof window !== "undefined" && localStorage.getItem("user");
  const user = typeof window !== "undefined" && JSON.parse(userSting);
  const status =
    typeof window !== "undefined" && JSON.parse(localStorage.getItem("status"));

  useEffect(() => {
    setChange(status);
  }, [status]);
  const navs = [
    {
      id: 1,
      address: "Home",
      url: "/",
    },
    {
      id: 2,
      address: "About",
      url: "/#about",
    },
  ];
  /**
   * The handleToggle function toggles the value of the toggle state variable.
   */
  const handleToggle = () => {
    setToggle(!toggle);
  };
  const handleLogout = () => {
    localStorage.setItem("status", false);
    setChange(false);
  };
  return (
    <div className={`p-4 py-6 bg-white drop-shadow-lg`}>
      <div className="flex justify-between list-none items-center">
        <div className="flex">
          <Image src="/logoipsum-277.svg" alt="" width={30} height={30} />
          <Link
            href={`/`}
            className="font-bold md:text-2xl text-xl text-slate-800"
          >
            TechConnect
          </Link>
        </div>
        <div className={`md:flex hidden`}>
          {navs.map((nav) => (
            <li
              key={nav.id}
              className={`mx-1 p-2 transition ease-in-out delay-150 duration-150 hover:text-indigo-500 rounded-lg font-semibold ${
                currentPath === nav.url ? "text-indigo-600" : ""
              }`}
            >
              <Link href={nav.url} className="flex items-center gap-1">
                <span>{nav.icon}</span>
                {nav.address}
              </Link>
            </li>
          ))}
          <div className="md:ml-5 md:flex md:flex-row flex flex-col items-center">
            {!user || !change ? (
              <>
                <Link
                  href="/login"
                  className="p-2 px-4 bg-indigo-500 text-white font-semibold rounded-lg transition duration-200 hover:bg-indigo-600 hover:scale-105"
                >
                  SignIn
                </Link>
                <Link
                  href="/signup"
                  className="p-2 px-4 text-black font-semibold rounded-lg ml-2 hover:bg-slate-300"
                >
                  SignUp
                </Link>
              </>
            ) : (
              <button
                className="p-2 px-4 bg-indigo-500 text-white font-semibold rounded-lg"
                onClick={handleLogout}
              >
                LogOut
              </button>
            )}
          </div>
        </div>
        <div className="md:hidden">
          {!toggle && <HiMenu className="w-6 h-6" onClick={handleToggle} />}
          {toggle && <HiX className="w-6 h-6" onClick={handleToggle} />}
        </div>
      </div>
      {/* <div className={`${toggle ? "" : " hidden"}`}> */}
      <div
        className={`${
          toggle ? "translate-y-2 delay-100" : "-translate-y-96 hidden"
        }  text-center transition-transform duration-500 ease-out list-none`}
      >
        {navs.map((nav) => (
          <li
            key={nav.id}
            className="my-1 p-2 transition ease-in-out delay-150 duration-300 hover:text-indigo-500 rounded-lg font-semibold"
            onClick={handleToggle}
          >
            <Link href={nav.url}>{nav.address}</Link>
          </li>
        ))}
        <div className="flex flex-col items-center">
          <Link
            href="/login"
            className="p-2 px-4 bg-indigo-500 text-white font-semibold rounded-lg w-1/3 text-center mb-2"
            onClick={handleToggle}
          >
            SignIn
          </Link>
          <Link
            href="/signup"
            className="p-2 px-4 text-black font-semibold rounded-lg hover:bg-slate-300 w-1/3 text-center bg-slate-50"
            onClick={handleToggle}
          >
            SignUp
          </Link>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Navbar;
