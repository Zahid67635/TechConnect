import Login from "@/components/login/Login";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="justify-center gap-48 mt-10 md:flex md:mt-20 md:px-10">
      <div className="md:flex justify-center h-[500px] hidden">
        <Image priority src="/login2.png" alt="" width={500} height={500} />
      </div>
      <div className="flex items-center justify-center md:mx-0">
        <Login />
      </div>
    </div>
  );
};

export default page;
