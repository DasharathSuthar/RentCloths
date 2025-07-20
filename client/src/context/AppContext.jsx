import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify'

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY

  const navigate = useNavigate()
  const [user, setUser] = useState(null);
  const [showUser, setShowUser] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState({});


  const fecthUser = async () => {
    try {
      const { data } = await axios.get('/api/users/isAuth');
      if (data.data) {
        setUser(data.data);
        setCartItems(data.data.cartItems)
      }
    } catch (error) {
      setUser(null)
    }
  }

  const fecthProducts = async () => {
    try {
      const { data } = await axios.get('/api/products/list');
      if (data.data) {
        setProducts(data.data)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems)

    if (cartData[itemId]) {
      cartData[itemId] += 1
    } else {
      cartData[itemId] = 1
    }

    setCartItems(cartData)
    toast.success("Added to cart")
  }

  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems)
    if (cartData[itemId]) {
      cartData[itemId] -= 1
      if (cartData[itemId] === 0) {
        delete cartData[itemId]
      }
    }
    setCartItems(cartData)
    toast.success("Removed From Cart")
  }

  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems)
    cartData[itemId] = quantity
    setCartItems(cartData)
    toast.success("Cart Updated")
  }

  const getCartCount = () => {
    let totalCount = 0
    for (const item in cartItems) {
      totalCount += cartItems[item]
    }
    return totalCount
  }

  const getCartAmount = () => {
    let totalAmount = 0
    for (const items in cartItems) {
      let itemInfo = products.find(product => product._id === items)
      if (cartItems[items] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[items]
      }
    }

    return Math.floor(totalAmount * 100) / 100
  }

  useEffect(() => {
    fecthUser();
    fecthProducts();
  }, []);

  useEffect(() => {
    const updatedCart = async () => {
      try {
        const { data } = await axios.post('/api/users/update', { cartItems })
        if (!data.data) {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

    if (user) {
      updatedCart()
    }
  }, [cartItems])

  const value = {
    currency,
    navigate,
    user, setUser,
    showUser, setShowUser,
    axios,
    searchQuery,
    setSearchQuery,
    getCartCount,
    addToCart,
    removeFromCart,
    updateCartItem,
    products,
    cartItems,
    setCartItems,
    getCartAmount
  }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
