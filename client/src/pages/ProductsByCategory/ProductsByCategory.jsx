import React from "react";
import { useParams } from "react-router-dom";
import { categories } from "../../assets";
import { dummyProducts } from "../../assets/assets";
import ProductCard from "../../components/BestSeller/ProductCard/ProductCard";

const ProductsByCategory = () => {
  const { category } = useParams();

  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category,
  );

  const filteredProducts = dummyProducts.filter(
    (product) => product.category.toLowerCase() === category,
  );

  return (
    <div className="mt-16">
      {searchCategory && (
        <div className="flex flex-col items-end w-max">
          <p className="text-3xl font-medium text-primary underline capitalize ">
            {searchCategory.text}
          </p>
        </div>
      )}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6">
          {filteredProducts
            .filter((product) => product.inStock)
            .map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-2xl font-medium text-secondary">
            No products Found in this category
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductsByCategory;
