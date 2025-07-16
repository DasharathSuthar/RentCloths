import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const NavBar = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, getCartCount, user, setUser } = useAppContext();
  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-secondary bg-white relative transition-all shadow-md">
      <Link to="/">
        <h1 className="text-3xl text-primary font-bold border-b-2 border-b-primary ">
          Rent <span className="text-black">Cloths</span>
        </h1>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-primary" : "hover:text-primary"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? "text-primary" : "hover:text-primary"
          }
        >
          All Products
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "text-primary" : "hover:text-primary"
          }
        >
          Contact
        </NavLink>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-secondary px-3 rounded-full">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.836 10.615 15 14.695"
              stroke="#7A7B7D"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              clipRule="evenodd"
              d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783"
              stroke="#7A7B7D"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="relative cursor-pointer">
          <svg
            width="18"
            height="18"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
              stroke="#615fff"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>

        {!user ? (
          <button
           onClick={()=>setUser(true)}
            className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-secondary transition text-white rounded-full text-sm"
          >
            Login
          </button>
        ) : (
          <div className="group relative">
            <img
              className=" w-10 rounded-full"
              src={assets.profile_icon}
              alt=""
            />
            <ul className="hidden  absolute group-hover:block w-28 right-0 top-10 bg-white shadow border border-gray-200 py-2.5  rounded-md text-sm z-40 ">
              <li
                onClick={() => navigate("/myorders")}
                className="p-1.5 pl-3 cursor-pointer hover:text-primary"
              >
                My Orders
              </li>
              <li onClick={() => setUser(false)} className="p-1.5 pl-3 cursor-pointer hover:text-primary">
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>

      <button
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        aria-label="Menu"
        className="sm:hidden"
      >
        {/* Menu Icon SVG */}
        <svg
          width="21"
          height="15"
          viewBox="0 0 21 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="21" height="1.5" rx=".75" fill="#426287" />
          <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
          <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
        </svg>
      </button>

      {/* Mobile Menu */}
      <div
        className={`${open ? "flex" : "hidden"} absolute z-10 top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
      >
        <NavLink
          to="/"
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            isActive ? "text-primary" : "hover:text-primary"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/products"
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            isActive ? "text-primary" : "hover:text-primary"
          }
        >
          All Products
        </NavLink>
        <NavLink
          to="/contact"
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            isActive ? "text-primary" : "hover:text-primary"
          }
        >
          Contact
        </NavLink>
        <button className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-secondary transition text-white rounded-full text-sm">
          Login
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
