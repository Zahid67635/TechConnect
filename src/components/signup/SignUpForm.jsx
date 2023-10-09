/* eslint-disable react/no-unescaped-entities */
"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
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
  // const mutation = useMutation({
  //   mutationFn: (data) => {
  //     return axios.post(
  //       `https://64e45121c55563802913014d.mockapi.io/user/v1/users`,
  //       data
  //     );
  //   },
  // });
  //formik setup start
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  };
  const {
    values,
    handleChange,
    handleSubmit,
    touched,
    errors,
    handleBlur,
  } = useFormik({
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
    <div className="w-full flex flex-col justify-center rounded-xl relative bg-transparent my-4">
      {/* <div className="w-20 h-20 rounded-full bg-slate-100 absolute top-[-35px] right-[] border-cyan-500">
        <Image
          src={`${userImg ? userImg : "/profile.jpg"}`}
          alt=""
          fill={true}
          className="rounded-full"
        />
      </div> */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center py-12 px-4 w-full"
      >
        <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">
          SignUp
        </h1>
        <label className="p-1 flex" htmlFor="name">
          Username
          <span className="text-red-500">*</span>
        </label>
        <div className="w-full relative mb-5 ">
          <FaUser className="absolute top-[13px] left-2 opacity-50" />
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            placeholder="Your full Name"
            className="rounded-2xl py-2 pl-8 w-full focus:outline-cyan-500 border-indigo-400 border border-l-4"
          />
          {errors.name && touched.name ? (
            <p className="text-red-500 pl-2">{errors.name}</p>
          ) : null}
        </div>
        <label className="p-1 flex" htmlFor="email">
          Email
          <span className="text-red-500">*</span>
        </label>
        <div className="w-full relative mb-5 ">
          <FaAt className="absolute top-[13px] left-2 opacity-50" />
          <input
            type="text"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            placeholder="Your Email"
            className="rounded-2xl py-2 pl-8 w-full focus:outline-cyan-500 border-indigo-400 border border-l-4"
          />
          {errors.email && touched.email ? (
            <p className="text-red-500 pl-2">{errors.email}</p>
          ) : null}
        </div>
        <label className="p-1 flex" htmlFor="password">
          Password
          <span className="text-red-500">*</span>
        </label>
        <div className="w-full relative mb-5 ">
          <FaKey className="absolute top-[13px] left-2 opacity-50" />
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            placeholder="Your Password"
            className="rounded-2xl py-2 pl-8 w-full focus:outline-cyan-500 border-indigo-400 border border-l-4"
          />
          {errors.password && touched.password ? (
            <p className="text-red-500 pl-2">{errors.password}</p>
          ) : null}
        </div>
        <label className="p-1 flex" htmlFor="confirm_password">
          Confirm Password
          <span className="text-red-500">*</span>
        </label>
        <div className="w-full relative mb-5 ">
          <FaKey className="absolute top-[13px] left-2 opacity-50" />
          <input
            type="password"
            name="confirm_password"
            value={values.confirm_password}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            placeholder="Confirm Password"
            className="rounded-2xl py-2 pl-8 w-full focus:outline-cyan-500 border-indigo-400 border border-l-4"
          />
          {errors.confirm_password && touched.confirm_password ? (
            <p className="text-red-500 pl-2">{errors.confirm_password}</p>
          ) : null}
        </div>
        <div className="w-full text-slate-600 mb-5">
          <span className="mb-4">Upload Your Image </span>
          <div className="flex items-center">
            <div className=" mr-3">
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
              className="cursor-pointer block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100 hover:file:cursor-pointer
      mt-2
    "
            />
          </div>
        </div>
        <button
          type="submit"
          className="outline outline-1 outline-black rounded-2xl transition duration-300 hover:bg-indigo-500 hover:text-white hover:outline-none text-semibold p-1 py-2 mt-4 w-1/2 mx-auto text-slate-600 font-semibold"
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
