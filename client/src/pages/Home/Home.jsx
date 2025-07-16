import React from "react";
import MainBanner from "../../components/MainBanner/MainBanner";
import Category from "../../components/Category/Category";
import BestSeller from "../../components/BestSeller/BestSeller";
import BottomBanner from "../../components/BottomBanner/BottomBanner";

const Home = () => {
  return (
    <div className="mt-10">
      <MainBanner />
      <Category />
      <BestSeller />
      <BottomBanner />
    </div>
  );
};

export default Home;
