import SignUpForm from "@/components/signup/SignUpForm";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="w-full md:flex">
      <div className="w-[65%] hidden md:block">
        <Image
          src={`/register.jpg`}
          alt=""
          width={400}
          height={400}
          className="w-full h-full"
        />
      </div>
      <div className="flex justify-center items-center md:w-[35%] mx-auto px-5">
        <SignUpForm />
      </div>
    </div>
  );
};

export default page;
