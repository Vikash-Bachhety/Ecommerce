import { Link, useParams } from "react-router-dom";
import { categories } from "./category.js";

const SubCategory = () => {
  const { id } = useParams();
  const category = categories.find((cat) => cat.id === parseInt(id));
  const subcategories = category ? category.subcategories : [];

  return (
    <div className="bg-slate-200 p-8">
      <h2 className="text-3xl font-bold text-teal-500 mb-8 text-center">
        {category ? category.name : "Subcategories"}
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {subcategories.map((subcategory) => (
          <div
            key={subcategory.id}
            className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center"
          >
            <img
              src={subcategory.image || 'default-image-url'}
              alt={subcategory.name}
              className="w-full h-48 object-cover mb-4 rounded-lg"
            />
            <div className="p-4 flex flex-col items-center w-96">
              <h3 className="text-xl font-bold mb-2 text-center">{subcategory.name}</h3>
              <p className="text-teal-500 text-sm mb-4 truncate w-full text-center">
                {truncate(subcategory.description, { length: 100, separator: " " })}
              </p>
              <Link
                to={`/${category.name}/${subcategory.name}`}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
              >
                Explore
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const truncate = (text, options) => {
  const { length, separator } = options;
  if (text.length <= length) return text;
  return text.slice(0, length) + (separator ? separator : '...');
};

export default SubCategory;
