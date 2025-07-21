import React, { useEffect, useState } from "react";
import ProductCard from "../../components/BestSeller/ProductCard/ProductCard";
import { useAppContext } from "../../context/AppContext";

const AllProducts = () => {
  const { products, searchQuery, isProductLoading } = useAppContext();

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);

  if (isProductLoading) {
    return (
      <div className="flex h-60 text-primary items-center justify-center mt-20 pb-20">
        <p>Loading products...</p>
      </div>
    );
  }

  return products.length > 0 ? (
    <div className="mt-16 flex flex-col">
      <div className="flex flex-col items-end w-max">
        <p className="text-3xl underline font-medium capitalize text-primary">
          All Products
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6">
        {filteredProducts
          .filter((product) => product.inStock)
          .map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
      </div>
    </div>
  ) : (
    <div className="flex h-60 text-primary items-center justify-center mt-20 pb-20">
      <p>No Product Found.</p>
    </div>
  );
};

export default AllProducts;
