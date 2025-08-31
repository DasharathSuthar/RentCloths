import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { toast, ToastContainer } from "react-toastify";
import { assets } from "../../assets/assets";

const Cart = () => {
  const {
    axios,
    user,
    products,
    cartItems,
    setCartItems,
    removeFromCart,
    getCartCount,
    updateCartItem,
    navigate,
    currency
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  const getCart = () => {
    let tempArray = [];
    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);
      tempArray.push({
        ...product,
        quantity: cartItems[key],
        size: "M",
        rentalStartDate: "",
        rentalEndDate: "",
        rentalDays: 0,
      });
    }
    setCartArray(tempArray);
  };

  const getUserAddress = async () => {
    try {
      const { data } = await axios.get("/api/addresses/list");
      if (data.data) {
        setAddresses(data.data);
        if (data.data.length > 0) {
          setSelectedAddress(data.data[0]);
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const updateCartProduct = (index, field, value) => {
    const updated = [...cartArray];
    updated[index][field] = value;

    const today = new Date().setHours(0, 0, 0, 0);
    const startDate = new Date(updated[index].rentalStartDate).setHours(
      0,
      0,
      0,
      0,
    );
    const endDate = new Date(updated[index].rentalEndDate).setHours(0, 0, 0, 0);

    if (startDate && startDate < today) {
      toast.error("Start date cannot be in the past");
      updated[index].rentalStartDate = "";
    }

    if (startDate && endDate && endDate < startDate) {
      toast.error("End date cannot be before start date");
      updated[index].rentalEndDate = "";
    }

    if (updated[index].rentalStartDate && updated[index].rentalEndDate) {
      const start = new Date(updated[index].rentalStartDate);
      const end = new Date(updated[index].rentalEndDate);
      const rentalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      updated[index].rentalDays = rentalDays > 0 ? rentalDays : 0;
    }

    setCartArray(updated);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const item of cartArray) {
      const rentalCost = item.offerPrice * item.quantity * item.rentalDays;
      totalAmount += rentalCost;
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  const placeOrder = async () => {
    try {
      if (!selectedAddress) {
        toast.error("Please select an address");
        return;
      }

      const confirmOrder = window.confirm(
        "Are you sure you want to place this order?",
      );
      if (!confirmOrder) return;

      const itemsPayload = cartArray.map((item) => ({
        product: item._id,
        quantity: item.quantity,
        size: item.size,
        rentalDays: item.rentalDays,
      }));

      const rentalStartDate = cartArray[0]?.rentalStartDate;
      const rentalEndDate = cartArray[0]?.rentalEndDate;

      if (!rentalStartDate || !rentalEndDate) {
        toast.error("Please select rental dates for your items");
        return;
      }


      const { data } = await axios.post("/api/orders/create", {
        items: itemsPayload,
        rentalStartDate,
        rentalEndDate,
        addressId: selectedAddress._id,
        paymentMethod: paymentOption.toLowerCase(),
      });

      if (data?.data) {
        toast.success(data.message);
        setCartItems({});
        navigate("/myorders");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Order failed");
    }
  };

  useEffect(() => {
    if (products.length > 0 && cartItems) getCart();
  }, [products, cartItems]);

  useEffect(() => {
    if (user) getUserAddress();
  }, [user]);

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="p-6 max-w-6xl mx-auto capitalize">
        <h1 className="text-3xl font-semibold mb-6 text-primary underline">
          Your Cart
        </h1>

        {cartArray.length > 0 ? (
          cartArray.map((product, index) => (
            <div
              key={product._id}
              className="border border-secondary/50 p-4 rounded mb-4 flex flex-col md:flex-row justify-between"
            >
              <div className="flex gap-4 items-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 object-cover"
                />
                <div>
                  <h2 className="font-bold capitalize">{product.name}</h2>
                  <p>Price per Day: {currency}{product.offerPrice}</p>
                  <label>
                    Size:
                    <select
                      className="ml-2 border"
                      value={product.size}
                      onChange={(e) =>
                        updateCartProduct(index, "size", e.target.value)
                      }
                    >
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </select>
                  </label>
                  <div className="mt-2">
                    <label>
                      Start Date:
                      <input
                        type="date"
                        className="ml-2 border"
                        min={new Date().toISOString().split("T")[0]}
                        value={product.rentalStartDate}
                        required
                        onChange={(e) =>
                          updateCartProduct(
                            index,
                            "rentalStartDate",
                            e.target.value,
                          )
                        }
                      />
                    </label>
                    <label className="ml-4">
                      End Date:
                      <input
                        type="date"
                        className="ml-2 border"
                        min={
                          product.rentalStartDate ||
                          new Date().toISOString().split("T")[0]
                        }
                        value={product.rentalEndDate}
                        onChange={(e) =>
                          updateCartProduct(
                            index,
                            "rentalEndDate",
                            e.target.value,
                          )
                        }
                        required
                      />
                    </label>
                  </div>
                  <p className="text-sm mt-1">
                    Rental Days: {product.rentalDays}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-between">
                <div>
                  <label htmlFor="qnt">Qnt.</label>
                  <select
                    className="border ml-2 w-10 text-center"
                    value={product.quantity}
                    id="qnt"
                    onChange={(e) =>
                      updateCartItem(product._id, Number(e.target.value))
                    }
                  >
                    {Array(9)
                      .fill(null)
                      .map((_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                  </select>
                </div>
                <p className="mt-2 text-green-500">
                  Subtotal: {currency}
                  {product.offerPrice * product.quantity * product.rentalDays}
                </p>
                <button
                  onClick={() => removeFromCart(product._id)}
                  className="mt-2"
                >
                  <img src={assets.remove_icon} alt="remove" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>
            <p>No items in cart</p>
            <p
              onClick={() => navigate("/products")}
              className="cursor-pointer mt-2 w-44 text-secondary"
            >
              Continue Shopping{" "}
              <img
                className="inline-block ml-2"
                src={assets.black_arrow_icon}
                alt=""
              />{" "}
            </p>
          </div>
        )}

        <div className="mt-8 border border-secondary/50 p-4 rounded">
          <h2 className="text-xl font-medium mb-4 text-secondary">
            Order Summary
          </h2>
          <p>Total Items: {getCartCount()}</p>
          <p className="text-green-500">Total Amount: {currency}{getCartAmount()}</p>

          <label className="block mt-4">
            Payment Method:
            <select
              value={paymentOption}
              onChange={(e) => setPaymentOption(e.target.value)}
              className="ml-2 border px-2"
            >
              <option value="COD">Cash on Delivery</option>
              <option value="Online">Online</option>
            </select>
          </label>

          <label className="block mt-4">
            Shipping Address:
            <select
              onChange={(e) =>
                setSelectedAddress(
                  addresses.find((addr) => addr._id === e.target.value),
                )
              }
              className="ml-2 border px-2 capitalize"
            >
              {addresses.map((addr) => (
                <option key={addr._id} value={addr._id}>
                  {addr.street}, {addr.city},{addr.state},{addr.country}
                </option>
              ))}
            </select>

            <p onClick={() => navigate('/addAddress')} className="text-white rounded inline-block bg-secondary  ml-3 text-center cursor-pointer p-2 hover:bg-primary">
              Add address
            </p>
          </label>

          <button
            onClick={placeOrder}
            className="mt-6 bg-secondary text-white px-6 py-2 rounded hover:bg-primary"
          >
            {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
