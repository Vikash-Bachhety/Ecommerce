import { Link } from "react-router-dom";
import { categories } from "./category.js";

const Category = () => {
  return (
    <div className="bg-teal-100 min-h-screen pb-6 mx-2">
      <div className="mx-auto">
      <h2 className="text-2xl font-bold p-2 mb-2">
      Categories
        </h2>
        <div className="flex flex-wrap justify-center gap-4 w-full">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white min-w-40 w-60 h-92 p-4 flex-wrap rounded-sm shadow-md flex flex-col min-w-md flex"
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
                className="bg-primary mx-auto text-white py-1 px-2 rounded-lg hover:bg-highlight transition"
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
