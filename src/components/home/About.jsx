import React from "react";

const About = () => {
  return (
    <div id="about" className="mb-5">
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 ">
        <h2 className="mb-32 text-4xl font-bold text-center text-indigo-800">
          Who We Are?
        </h2>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-12 text-center text-gray-700 ">
          <div className="w-[350px] h-60 bg-gray-50 flex items-center justify-center md:space-x-2 relative rounded-lg hover:bg-gray-100 transition duration-200 md:hover:scale-105 cursor-pointer hover:border border-indigo-400 group">
            <div className="absolute top-[-40px] right-[130px] bg-gray-100 rounded-full group group-hover:border-t-2 border-indigo-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-20 h-20 p-1 group group-hover:text-indigo-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                />
              </svg>
            </div>
            <div className="p-5">
              <h1 className="text-xl font-bold text-center mb-5">
                What we do?
              </h1>
              <p className="text-base">
                We are committed to staying up-to-date with the latest trends in
                the industry, ensuring that our readers are well-informed.
              </p>
            </div>
          </div>
          <div className="w-[350px] h-60 bg-gray-50 flex items-center justify-center space-x-2 relative rounded-lg hover:bg-gray-100 transition duration-200 md:hover:scale-105 cursor-pointer hover:border border-indigo-400 group">
            <div className="absolute top-[-40px] right-[130px] bg-gray-100 rounded-full group group-hover:border-t-2 border-indigo-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-20 h-20 p-1 group group-hover:text-indigo-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z"
                />
              </svg>
            </div>
            <div className="p-5">
              <h1 className="text-xl font-bold text-center mb-5">
                Why Choose Us?
              </h1>
              <p className="text-base">
                Our reviews are entirely independent and free from external
                influence.
              </p>
            </div>
          </div>
          <div className="w-[350px] h-60 bg-gray-100 flex items-center justify-center space-x-2 relative rounded-lg hover:bg-gray-50 transition duration-200 md:hover:scale-105 cursor-pointer hover:border border-indigo-400 group">
            <div className="absolute top-[-40px] right-[130px] bg-gray-100 rounded-full group group-hover:border-t-2 border-indigo-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-20 h-20 group group-hover:text-indigo-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="p-5">
              <h1 className="text-xl font-bold text-center mb-5">
                Our Experience team
              </h1>
              <p className="text-base">
                Our team consists of tech experts with years of experience,
                ensuring you receive reliable and knowledgeable analysis
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
