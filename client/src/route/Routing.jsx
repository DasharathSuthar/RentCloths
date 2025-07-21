import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import MasterPage from "../pages/Master/MasterPage";
import ProductsByCategory from "../pages/ProductsByCategory/ProductsByCategory";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import AllProducts from "../pages/AllProducts/AllProducts";
import MyOrders from "../pages/MyOrders/MyOrders";
import ContactUs from "../pages/ContactUs/ContactUs";
import Cart from "../pages/Cart/Cart";
import SellerLogin from "../components/Seller/SellerLogin/SellerLogin";
import { useAppContext } from "../context/AppContext";
import SellerLayout from "../pages/SellerPages/SellerLayout";
import AddProduct from "../pages/SellerPages/AddProduct";
import ProductList from "../pages/SellerPages/ProductList";
import Orders from "../pages/SellerPages/Orders";

const Routing = () => {
  const { isSeller } = useAppContext();

  return (
    <>
      <Routes>
        <Route path="/" element={<MasterPage />}>
          <Route index element={<Home />} />
          <Route path="products" element={<AllProducts />} />
          <Route path="products/:category" element={<ProductsByCategory />} />
          <Route path="products/:category/:id" element={<ProductDetails />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="cart" element={<Cart />} />
          <Route path="myorders" element={<MyOrders />} />
        </Route>
        <Route
          path="/seller"
          element={isSeller ? <SellerLayout /> : <SellerLogin />}
        >
          <Route index element={isSeller ? <AddProduct /> : null} />
          <Route path="productlist" element={<ProductList />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
    </>
  );
};

export default Routing;
