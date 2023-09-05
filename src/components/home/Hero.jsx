import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="my-20">
      <h1 className="text-center text-4xl font-bold mb-2 text-gray-800">
        Creating inspiring{" "}
        <span className="text-indigo-500">spaces and environments</span>
      </h1>
      <p className="text-center text-lg font-semibold mb-5 text-slate-600">
        A lot of people use TechConnect for the comparation
      </p>
      <div className="flex flex-col-reverse md:flex-row justify-center px-10">
        <div className="md:w-1/2 p-4 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-8">
            Stronger and better together
          </h2>
          <p className="text-lg text-slate-500">
            A successful project requires understanding partners and
            collaboration. At TechConnect we believe we can create the optimal
            workflows for a project to succeed.
          </p>
        </div>
        <div className="md:w-1/2 rounded-3xl md:p-4 p-1">
          <Image
            src={`/gaming.png`}
            alt=""
            width={400}
            height={400}
            className="w-full p-3 rounded-3xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
