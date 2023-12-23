/* eslint-disable react/no-unescaped-entities */
"use client";

import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaUser, FaKey, FaAt } from "react-icons/fa";
import { signUpSchema } from "./signUpSchema";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const SignUpForm = () => {
  const [userImg, setUserImg] = useState("");
  const router = useRouter();
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserImg(imageUrl);
    } else {
      setUserImg("");
    }
  };

  //formik setup start
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  };
  const { values, handleChange, handleSubmit, touched, errors, handleBlur } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values, action) => {
        localStorage.setItem("user", JSON.stringify(values));
        localStorage.setItem("status", true);
        toast.success("Registration Success");
        router.push("/");
        action.resetForm();
      },
    });
  //end
  return (
    <div className="relative flex flex-col justify-center w-full py-4 bg-transparent rounded-xl">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center w-full px-4 py-12"
      >
        <h1 className="mb-8 text-3xl font-bold text-center text-indigo-600">
          SignUp
        </h1>
        <label className="flex p-1" htmlFor="name">
          Username
          <span className="text-red-500">*</span>
        </label>
        <div className="relative w-full mb-5 ">
          <FaUser className="absolute top-[13px] left-2 opacity-50" />
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            placeholder="Your full Name"
            className="w-full py-2 pl-8 border border-l-4 border-indigo-400 rounded-2xl focus:outline-cyan-500"
          />
          {errors.name && touched.name ? (
            <p className="pl-2 text-red-500">{errors.name}</p>
          ) : null}
        </div>
        <label className="flex p-1" htmlFor="email">
          Email
          <span className="text-red-500">*</span>
        </label>
        <div className="relative w-full mb-5 ">
          <FaAt className="absolute top-[13px] left-2 opacity-50" />
          <input
            type="text"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            placeholder="Your Email"
            className="w-full py-2 pl-8 border border-l-4 border-indigo-400 rounded-2xl focus:outline-cyan-500"
          />
          {errors.email && touched.email ? (
            <p className="pl-2 text-red-500">{errors.email}</p>
          ) : null}
        </div>
        <label className="flex p-1" htmlFor="password">
          Password
          <span className="text-red-500">*</span>
        </label>
        <div className="relative w-full mb-5 ">
          <FaKey className="absolute top-[13px] left-2 opacity-50" />
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            placeholder="Your Password"
            className="w-full py-2 pl-8 border border-l-4 border-indigo-400 rounded-2xl focus:outline-cyan-500"
          />
          {errors.password && touched.password ? (
            <p className="pl-2 text-red-500">{errors.password}</p>
          ) : null}
        </div>
        <label className="flex p-1" htmlFor="confirm_password">
          Confirm Password
          <span className="text-red-500">*</span>
        </label>
        <div className="relative w-full mb-5 ">
          <FaKey className="absolute top-[13px] left-2 opacity-50" />
          <input
            type="password"
            name="confirm_password"
            value={values.confirm_password}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            placeholder="Confirm Password"
            className="w-full py-2 pl-8 border border-l-4 border-indigo-400 rounded-2xl focus:outline-cyan-500"
          />
          {errors.confirm_password && touched.confirm_password ? (
            <p className="pl-2 text-red-500">{errors.confirm_password}</p>
          ) : null}
        </div>
        <div className="w-full mb-5 text-slate-600">
          <span className="mb-4">Upload Your Image </span>
          <div className="flex items-center">
            <div className="mr-3 ">
              <Image
                src={`${userImg ? userImg : "/profile.jpg"}`}
                alt=""
                width={60}
                height={60}
                className="rounded-lg"
              />
            </div>
            <input
              name="user_image"
              value={values.user_image}
              onChange={handleImageUpload}
              onBlur={handleBlur}
              id="userImage"
              type="file"
              className="block w-full mt-2 text-sm cursor-pointer text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 hover:file:cursor-pointer "
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-1/2 p-1 py-2 mx-auto mt-4 font-semibold transition duration-300 outline outline-1 outline-black rounded-2xl hover:bg-indigo-500 hover:text-white hover:outline-none text-semibold text-slate-600"
        >
          SignUp
        </button>
      </form>
      <p className="text-center text-slate-600">
        Already Have an Account?
        <Link href="/login" className="font-semibold ">
          {" "}
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUpForm;
