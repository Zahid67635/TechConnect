import React from "react";
import CategoryCard from "../CategoryCard";

const Categories = () => {
  const categoryData = [
    {
      name: "Gaming PC",
      path: "/categories/gamingpc",
      image: "https://live.staticflickr.com/65535/52522584794_4a9898a992_o.jpg",
    },
    {
      name: "Gaming Phone",
      path: "/categories/phone",
      image: "https://i.ibb.co/W6yVbs5/asus-rog-7.png",
    },
    {
      name: "Gaming Laptop",
      path: "/categories/laptop",
      image: "/gaminglaptop.png",
    },
  ];

  return (
    <div className="flex flex-col items-center mx-2 my-5 mb-10">
      <h1 className="mb-3 text-4xl font-bold text-center text-black">
        Choose Your <span className="text-indigo-500">Category</span>
      </h1>
      <p className="mb-20 text-lg font-semibold text-center text-slate-600">
        Find Your Product by Select Your Category like Gaming PC, Gaming Phone
        Or Gaming Laptop
      </p>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 sm:grid-cols-2 md:gap-20 md:w-3/4 md:mx-auto ">
        {categoryData.map((c, i) => (
          <CategoryCard key={i} data={c} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
