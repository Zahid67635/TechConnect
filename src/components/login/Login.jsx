/* eslint-disable react/no-unescaped-entities */
"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaKey, FaAt, FaEyeSlash, FaEye } from "react-icons/fa";
import { loginSchema } from "./loginSchema";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";

const Login = () => {
  const [toggleEye, setToggleEye] = useState(false);
  const router = useRouter();
  const validUser = (values) => {
    const { email, password } = values;
    const savedUserString = localStorage.getItem("user");
    const savedUser = JSON.parse(savedUserString);
    if (savedUser.email !== email) {
      toast.error(<p className="font-bold">Please create account</p>);
      return false;
    } else {
      if (password === savedUser?.password) {
        return true;
      } else {
        toast.error(<p className="font-bold">Password incorrect</p>);
        return false;
      }
    }
  };
  const initialValues = {
    email: "",
    password: "",
  };
  const { values, handleChange, handleSubmit, touched, errors, handleBlur } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: (values, action) => {
        const isValid = validUser(values);
        if (isValid) {
          localStorage.setItem("status", true);
          toast.success(<p className="font-bold">Login Successful</p>);
          router.push("/");
          action.resetForm();
        }
      },
    });
  return (
    <div className="relative flex flex-col justify-center w-full mx-3 border border-indigo-400 shadow-md md:w-96 rounded-xl shadow-slate-300">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center px-5 py-10 md:w-96"
      >
        <h1 className="mb-5 text-3xl font-bold text-center text-slate-700">
          Login
        </h1>
        <label className="flex" htmlFor="email">
          {" "}
          Email
          <span className="text-red-500">*</span>
        </label>
        <div className="relative w-full mb-5">
          <FaAt className="absolute top-[13px] left-2 opacity-50" />

          <input
            type="text"
            placeholder="Your Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full py-2 border border-l-4 border-indigo-400 rounded-lg outline-none bg-indigo-50 pl-7"
          />
          {errors.email && touched.email ? (
            <p className="pl-2 text-red-500 ">{errors.email}</p>
          ) : null}
        </div>
        <label htmlFor="password flex">
          Password
          <span className="text-red-500">*</span>
        </label>
        <div className="relative w-full mb-5">
          <FaKey className="absolute top-[13px] left-2 opacity-50" />
          <input
            type={`${toggleEye ? "text" : "password"}`}
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Your Password"
            className="w-full py-2 border border-l-4 border-indigo-400 rounded-lg outline-none bg-indigo-50 pl-7"
          />
          {toggleEye ? (
            <FaEye
              className="absolute top-[13px] right-3 opacity-50 cursor-pointer text-xl"
              onClick={() => setToggleEye(!toggleEye)}
            />
          ) : (
            <FaEyeSlash
              className="absolute top-[13px] right-3 opacity-50 cursor-pointer text-xl"
              onClick={() => setToggleEye(!toggleEye)}
            />
          )}
          {errors.password && touched.password ? (
            <p className="pl-2 text-red-500">{errors.password}</p>
          ) : null}
          <a href="" className="flex justify-end mt-1 underline">
            Forget password
          </a>
        </div>
        <button
          type="submit"
          className="w-full p-1 mt-5 font-semibold transition duration-300 outline outline-1 outline-indigo-400 rounded-2xl hover:bg-indigo-400 hover:outline-none hover:text-white"
        >
          SignIn
        </button>

        <p className="text-center">
          Don't Have an Account?{" "}
          <Link href="/signup" className="font-semibold text-blue-700">
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
