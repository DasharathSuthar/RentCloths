import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { assets, dummyProducts } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";

const ProductDetails = () => {
  const { products, navigate, addToCart, cartItems, removeFromCart } = useAppContext()

  const { id } = useParams();

  const [thumbnail, setThumbnail] = useState(null);

  const product = products.find((item) => item._id === id);

  useEffect(() => {
    setThumbnail(product?.image ? product.image : null);
  }, [product]);

  return product && (
    <div className="mt-16">
      <p>
        <Link to={"/"}>Home</Link> /<Link to={"/products"}> Products</Link> /
        <Link to={`/products/${product.category.toLowerCase()}`}>
          {" "}
          {product.category}
        </Link>{" "}
        /<span className="text-secondary"> {product.name}</span>
      </p>

      <div className="flex flex-col md:flex-row gap-16 mt-4">
        <div className="flex gap-3">
          <div className="flex flex-col gap-3">
            {/* {product.image.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))} */}
          </div>

          <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
            <img src={thumbnail} alt="Selected product" />
          </div>
        </div>

        <div className="text-sm w-full md:w-1/2">
          <h1 className="text-3xl font-medium">{product.name}</h1>

          <div className="flex items-center gap-0.5 mt-1">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  className="md:w-3.5 w-3"
                  key={i}
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt=""
                />
              ))}
            <p className="text-base ml-2">4</p>
          </div>

          <div className="mt-6">
            <p className="text-gray-500/70 line-through">
              MRP:$ {product.price}
            </p>
            <p className="text-2xl font-medium">MRP:$ {product.offerPrice}</p>
            <span className="text-gray-500/70">(inclusive of all taxes)</span>
          </div>

          <p className="text-base font-medium mt-6">About Product</p>
          <ul className="list-disc ml-4 text-gray-500/70">
            {/* {product.description.map((desc, index) => ( */}
            <li >{product.description}</li>
            {/* ))} */}
          </ul>

          <div className="flex items-center mt-10 gap-4 text-base">
            <div className="flex justify-center items-center gap-6  w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition">
              <button
                onClick={() => removeFromCart(product._id)}
                className="cursor-pointer border border-secondary text-md px-3 rounded h-full"
              >
                -
              </button>
              <span className="w-5 text-center">
                {cartItems[product._id]}
              </span>
              <button
                onClick={() => addToCart(product._id)}
                className="cursor-pointer text-md border border-secondary px-3 rounded h-full"
              >
                +
              </button>
            </div>
            {/* <button
              onClick={() => addToCart(product._id)}
              className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
            >
              Add to Cart
            </button> */}
            <button
              onClick={() => {
                addToCart(product._id);
                navigate("/cart");
              }}
              className="w-full py-3.5 cursor-pointer font-medium bg-secondary text-white hover:bg-primary transition"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
