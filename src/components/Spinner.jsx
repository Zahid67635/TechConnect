import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center space-x-2 min-h-screen">
      <div className="w-6 h-6 rounded-full animate-pulse bg-indigo-600"></div>
      <div className="w-6 h-6 rounded-full animate-pulse bg-indigo-600"></div>
      <div className="w-6 h-6 rounded-full animate-pulse bg-indigo-600"></div>
    </div>
  );
};

export default Spinner;
