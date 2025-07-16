import React from "react";
import { Link } from "react-router-dom";
import { bgBanner } from "../../assets";

const MainBanner = () => {
  return (
    <div className="relative ">
      <img
        className="w-full h-[450px] rounded-lg hidden md:block"
        src={bgBanner}
        alt=""
      />
      <img className="w-full md:hidden" src={bgBanner} alt="" />
      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24 ">
        <h1 className="text-3xl text-gray-300 md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-96 leading-tight lg:leading-15">
          Style You’ll Love, Flexibility You Need!
        </h1>
        <div className="flex items-center mt-6 font-medium">
          <Link
            to={"/products"}
            className="group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-secondary transition rounded text-white cursor-pointer"
          >
            Shop Now
          </Link>
          <Link
            to={"/products"}
            className="group text-white hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer"
          >
            Explore Deals
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
