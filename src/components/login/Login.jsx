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
    <div className="md:w-96 w-full flex flex-col justify-center border border-indigo-400 rounded-xl relative shadow-slate-300 shadow-md mx-3">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center py-10 px-5 md:w-96"
      >
        <h1 className="text-3xl font-bold text-slate-700 text-center mb-5">
          Login
        </h1>
        <label className="flex" htmlFor="email">
          {" "}
          Email
          <span className="text-red-500">*</span>
        </label>
        <div className="w-full relative mb-5">
          <FaAt className="absolute top-[13px] left-2 opacity-50" />

          <input
            type="text"
            placeholder="Your Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="rounded-lg py-2 pl-7 w-full outline-none border border-l-4 border-indigo-400 bg-indigo-100"
          />
          {errors.email && touched.email ? (
            <p className="text-red-500 pl-2 ">{errors.email}</p>
          ) : null}
        </div>
        <label htmlFor="password flex">
          Password
          <span className="text-red-500">*</span>
        </label>
        <div className="w-full relative mb-5">
          <FaKey className="absolute top-[13px] left-2 opacity-50" />
          <input
            type={`${toggleEye ? "text" : "password"}`}
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Your Password"
            className="rounded-lg py-2 pl-7 w-full outline-none border border-l-4 border-indigo-400 bg-indigo-100"
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
            <p className="text-red-500 pl-2">{errors.password}</p>
          ) : null}
          <a href="" className="flex justify-end underline mt-1">
            Forget password
          </a>
        </div>
        <button
          type="submit"
          className="outline outline-1 outline-indigo-400 rounded-2xl transition duration-300 hover:bg-indigo-400 hover:outline-none hover:text-white font-semibold p-1 mt-5 w-full"
        >
          SignIn
        </button>

        <p className="text-center">
          Don't Have an Account?{" "}
          <Link href="/signup" className="text-blue-700 font-semibold">
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
