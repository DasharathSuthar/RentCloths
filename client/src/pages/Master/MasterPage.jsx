import React from "react";
import NavBar from "../../components/Navbar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const MasterPage = () => {
  return (
    <>
      <NavBar />
      <div className="px-6 md:px-16 lg:px-24 xl:px-32">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MasterPage;
