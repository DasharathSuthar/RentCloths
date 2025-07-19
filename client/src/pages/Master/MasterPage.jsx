import React from "react";
import NavBar from "../../components/Navbar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { useAppContext } from '../../context/AppContext'
import LoginForm from "../../components/loginForm/LoginForm";

const MasterPage = () => {
  const { showUser } = useAppContext()

  return (
    <>
      <NavBar />
      {showUser ? <LoginForm /> : null}

      <div className="px-6 md:px-16 lg:px-24 xl:px-32">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MasterPage;
