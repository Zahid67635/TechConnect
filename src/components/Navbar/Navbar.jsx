"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { HiMenu, HiX } from "react-icons/hi";
import Image from "next/image";
const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [change, setChange] = useState(false);
  const currentPath = usePathname();
  const router = useRouter();
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
    router.push("/");
  };
  return (
    <div className={`p-4 py-6 bg-white drop-shadow-lg sticky top-0 z-50 `}>
      <div className="flex items-center justify-between list-none md:w-3/4 md:mx-auto ">
        <div className="flex">
          <Image src="/logoipsum-277.svg" alt="" width={30} height={30} />
          <Link
            href={`/`}
            className="text-xl font-bold md:text-2xl text-slate-800"
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
          <div className="flex flex-col items-center md:ml-5 md:flex md:flex-row">
            {!user || !change ? (
              <>
                <Link
                  href="/login"
                  className="p-2 px-4 font-semibold text-white transition duration-200 bg-indigo-500 rounded-lg hover:bg-indigo-600 hover:scale-105"
                >
                  SignIn
                </Link>
                <Link
                  href="/signup"
                  className="p-2 px-4 ml-2 font-semibold text-black rounded-lg hover:bg-slate-300"
                >
                  SignUp
                </Link>
              </>
            ) : (
              <button
                className="p-2 px-4 font-semibold text-white bg-indigo-500 rounded-lg"
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
            className="p-2 my-1 font-semibold transition duration-300 ease-in-out delay-150 rounded-lg hover:text-indigo-500"
            onClick={handleToggle}
          >
            <Link href={nav.url}>{nav.address}</Link>
          </li>
        ))}
        <div className="flex flex-col items-center">
          <Link
            href="/login"
            className="w-1/3 p-2 px-4 mb-2 font-semibold text-center text-white bg-indigo-500 rounded-lg"
            onClick={handleToggle}
          >
            SignIn
          </Link>
          <Link
            href="/signup"
            className="w-1/3 p-2 px-4 font-semibold text-center text-black rounded-lg hover:bg-slate-300 bg-slate-50"
            onClick={handleToggle}
          >
            SignUp
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
