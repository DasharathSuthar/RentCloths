import React from "react";
import { assets, features } from "../../assets/assets";

const BottomBanner = () => {
  return (
    <div className="relative mt-10 h-[400px]">
      <img
        className="w-full hidden md:block rounded-lg h-full object-cover"
        src={assets.bottom_banner_image}
        alt=""
      />
      {/* <img className='w-full md:hidden' src={assets.bottom_banner_image_sm} alt="" /> */}
      <div className="absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-24">
        <div className="bg-black/95 p-12 rounded-lg">
          <h1 className="text-2xl md:text-3xl font-semibold text-white mb-6">
            Why We Are the Best?
          </h1>
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex items-center text-white gap-4 mt-2"
            >
              <img
                className="md:w-11 w-9"
                alt="delivery_truck_icon"
                src={feature.icon}
              />
              <div>
                <h3 className="text-lg md:text-xl font-semibold">
                  {feature.title}
                </h3>
                <p className="text-gray-500/70 text-xs md:text-sm">
                  {feature.description}{" "}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;
