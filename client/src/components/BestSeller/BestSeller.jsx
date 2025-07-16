import React from "react";
import ProductCard from "./ProductCard/ProductCard";
import { dummyProducts } from "../../assets/assets";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0 },
};

const BestSeller = () => {
  return (
    <div className="mt-10">
      <p className="text-2xl font-medium md:text-3xl text-secondary underline text-center pb-4">
        Best Sellers
      </p>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      >
        {dummyProducts
          .filter((product) => product.inStock)
          .slice(0, 5)
          .map((product) => (
            <motion.div variants={childVariants} key={product._id}>
              <ProductCard product={product} />
            </motion.div>
          ))}
      </motion.div>
    </div>
  );
};

export default BestSeller;
