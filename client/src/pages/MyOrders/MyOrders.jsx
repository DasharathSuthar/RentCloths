import { useEffect, useState } from "react";
import { assets, dummyOrders } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { toast, ToastContainer } from "react-toastify";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { axios, user, navigate } = useAppContext();

  const fecthMyOrders = async () => {
    try {
      const { data } = await axios.get("/api/orders/user");

      if (data) {
        setMyOrders(data.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (user) {
      fecthMyOrders();
    }
  }, [user]);
  return myOrders.length > 0 ? (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="mt-16 pb-16 capitalize">
        <div className="flex flex-col items-end w-max mb-8">
          <p className="text-3xl font-medium capitalize text-primary underline">
            My Orders
          </p>
        </div>
        {myOrders.map((order, index) => (
          <div
            key={index}
            className="border border-secondary/40 rounded-lg mb-10 p-4 py-5 max-w-4xl"
          >
            <p className="flex justify-between md:items-center text-gray-600 md:font-medium max-md:flex-col">
              <span>OrderId : {order._id}</span>
              <span className="uppercase">Payment : {order.paymentMethod}</span>
              <span className="text-green-400">
                TotalAmount : ${order.totalAmount}
              </span>
            </p>
            {order.items.map((item, index) => (
              <div
                key={index}
                className={`relative bg-white text-gray-600 ${order.items.length !== index + 1 && "border-b-secondary/40 border-b"} border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl`}
              >
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="bg-secondary/40 p-4 rounded-lg ">
                    <img
                      src={item.product.image}
                      className="w-16 h-16"
                      alt=""
                    />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-xl font-medium text-gray-800">
                      {item.product.name}
                    </h2>
                    <p>Category : {item.product.category}</p>
                  </div>
                </div>

                <div className="flex flex-col justify-center md:ml-8 mb-4 md:mb-0">
                  <p>Quantity : {item.quantity || "1"} </p>
                  <p>Status : {order.orderStatus || "1"} </p>
                  <p>
                    RentalStartDate :{" "}
                    {new Date(order.rentalStartDate).toLocaleDateString()}
                  </p>
                  <p>
                    RentalEndDate :{" "}
                    {new Date(order.rentalEndDate).toLocaleDateString()}
                  </p>
                  <p>TotalRentDays : {item.rentalDays} </p>
                </div>

                <p className="text-lg font-medium text-secondary">
                  AmountPerProduct : ${item.product.offerPrice * item.quantity}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  ) : (
    <div className="mt-16 pb-16 h-64 capitalize flex flex-col items-center justify-center text-primary">
      <p>no such orders found</p>
      <p
        onClick={() => navigate("/products")}
        className="cursor-pointer text-center mt-2 w-44 text-secondary"
      >
        Continue Shopping{" "}
        <img
          className="inline-block ml-2"
          src={assets.black_arrow_icon}
          alt=""
        />{" "}
      </p>
    </div>
  );
};

export default MyOrders;
