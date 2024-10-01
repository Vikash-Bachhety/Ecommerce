import { Link } from "react-router-dom";
import { categories } from "./category.js";

const Category = () => {
  return (
    <div className="bg-slate-200 min-h-screen p-8">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-teal-500 mb-8 text-center">
          Categories
        </h2>
        <div className="flex flex-wrap justify-center gap-8 w-full">
          {categories.map((category) => (
            <div
              key={category.id}
              className="min-w-80 w-96 bg-white p-4 rounded-lg shadow-md flex flex-col items-center transform hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out"
            >
              <img
                src={category.image}
                alt={category.name}
                className="h-48 w-full object-cover mb-4 rounded-lg"
              />
              <h3 className="text-xl font-semibold text-primary mb-2 text-center">
                {category.name}
              </h3>
              <p className="text-teal-500 text-sm mb-4 truncate w-full text-center">
                {category.description}
              </p>
              <Link
                to={`/category/${category.id}`}
                className="bg-primary text-white py-2 px-4 rounded-full hover:bg-highlight transition"
              >
                Explore
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
