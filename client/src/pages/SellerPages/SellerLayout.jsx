import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { toast, ToastContainer } from "react-toastify";

const SellerLayout = () => {
  const { axios, navigate } = useAppContext();

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    {
      name: "Product List",
      path: "/seller/productlist",
      icon: assets.product_list_icon,
    },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/seller/logout");
      if (data.data) {
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <ToastContainer autoClose={2000} position="top-center" />
      <div className="flex items-center capitalize justify-between px-4 md:px-8 border-b border-secondary py-3 bg-white ">
        <Link to="/">
          <h1 className="text-3xl text-primary font-bold border-b-2 border-b-primary ">
            Rent <span className="text-black">Cloths</span>
          </h1>
        </Link>
        <div className="flex items-center gap-5 text-gray-500">
          <p>Hi! Admin</p>
          <button
            onClick={logout}
            className="border border-secondary text-secondary rounded-full text-sm px-4 py-1"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex">
        <div className="md:w-64 w-16 border-r h-[95vh] text-base border-secondary pt-4 flex flex-col ">
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/seller"}
              className={({ isActive }) => `flex items-center py-3 px-4 gap-3 
                            ${
                              isActive
                                ? "border-r-4 md:border-r-[6px] bg-indigo-500/10 border-secondary text-secondary"
                                : "hover:bg-gray-100/90 border-white text-gray-700"
                            }`}
            >
              <img src={item.icon} className="w-7 h-7" alt="" />
              <p className="md:block hidden text-center">{item.name}</p>
            </NavLink>
          ))}
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default SellerLayout;
