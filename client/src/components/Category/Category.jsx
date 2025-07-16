import { categories } from "../../assets";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Category = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-10">
      <p className="text-2xl font-medium md:text-3xl text-secondary underline text-center pb-4">
        Categories
      </p>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {categories.map((category, index) => (
          <div
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
            style={{ backgroundColor: category.bgColor }}
            key={index}
            className="group cursor-pointer py-5 px-3 gap-2 rounded-lg h-60 flex flex-col justify-center text-center items-center"
          >
            <motion.img
              src={category.img}
              alt={category.text}
              className="group-hover:scale-105 transition max-w-28"
              animate={{ scale: [0.8, 1, 0.8] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <p className="text-sm font-medium text-gray-800">{category.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
