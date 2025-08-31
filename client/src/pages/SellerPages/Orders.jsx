import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import { toast, ToastContainer } from "react-toastify";

const Orders = () => {
  const { currency, axios } = useAppContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/orders/seller");
      if (data.data) {
        setOrders(data.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchOrders()
  
  }, []);

  return orders?.length > 0 ? (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll">
        <div className="md:p-10 p-4 space-y-4">
          <h2 className="text-lg font-medium">Orders List</h2>
          {orders.map((order, index) => (
            <div
              key={index}
              className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800"
            >
              <div className="flex gap-5">
                <img
                  className="w-12 h-12 object-cover"
                  src={assets.box_icon}
                  alt="boxIcon"
                />
                <div>
                  {order.items.map((item, index) => (
                    <div key={index} className="flex flex-col justify-center">
                      <p className="font-medium">
                        {item.product.name}{" "}
                        <span className="text-green-400">
                          x {item.quantity}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-sm md:text-base text-black/60">
                <p className="text-black/80">
                  {order.address?.firstName} {order.address?.lastName}
                </p>
                <p className="text-black/80">
                  {order.address?.street}, {order.address?.city},
                </p>
                <p className="text-black/80">
                  {order.address?.state},{order.address?.zipcode},{" "}
                  {order.address?.country}
                </p>
                <p>{order.address?.phone}</p>
              </div>

              <p className="font-medium text-base my-auto text-black/70">
                {currency}
                {order.totalAmount}
              </p>

              <div className="flex flex-col text-sm">
                <p>Method: {order.paymentMethod}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  ) : (
    <div className=" capitalize text-center w-full mt-10 text-primary">
      <p>no such orders found</p>
    </div>
  );
};

export default Orders;
