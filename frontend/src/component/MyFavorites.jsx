import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode"; // Removed curly braces for correct import
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import useAddFav from "./useAddFav.js";
import useUserData from "./useUserData.js";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";

const MyProducts = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const { isLoggedIn } = useSelector((state) => state.auth); // Assuming you have auth state
  const navigate = useNavigate(); // For the back button navigation
  const { favorites, setFavorites, userId } = useUserData();
  const { handleFav } = useAddFav(favorites, setFavorites, userId);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!isLoggedIn || !token) return;
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.user.id;
        const response = await axios.get(
          `https://omnimart.up.railway.app/api/auth/${userId}/myfavorites`
        );
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [favorites]); // <-- Added `favorites` as a dependency

  if (loading) {
    return <div>Loading...</div>;
  }

  if (categories.length === 0) {
    return <div>No products found.</div>;
  }

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="w-full min-h-screen mx-auto p-4">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className=" bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-300 flex items-center"
      >
        <IoMdArrowRoundBack />
        <span className="ml-2">Back</span>
      </button>

      <h2 className="text-3xl font-bold text-teal-500 mb-8 text-center">
        My Favorites
      </h2>

      <div className="w-full flex flex-wrap gap-8 items-center justify-center p-8">
        {categories.map((product) => (
          <div
            key={product._id}
            className="bg-white min-w-sm w-96 h-auto p-3 flex-wrap rounded-lg shadow-md flex-col min-w-md flex"
          >
            <img
              src={product.imageUrl}
              alt={product.productName}
              className="h-48 w-full object-cover mb-4 rounded-lg"
            />
            <h3 className="text-xl font-semibold text-primary mb-2">
              {product.productName}
            </h3>
            <p className="text-gray-700 mb-2">
              <b>Price</b>: ₹{product.actualPrice}
            </p>
            <p className="text-gray-700 mb-2">
              <b>Offer Price</b>: ₹{product.offerPrice}
            </p>
            <p className="text-gray-600 mb-4">
              <b>Description</b>: {product.description}
            </p>
            {favorites.includes(product._id) ? (
              <IoIosHeart
                size={32}
                className="text-rose-500 cursor-pointer"
                onClick={() => handleFav(product._id)}
              />
            ) : (
              <IoIosHeartEmpty
                size={32}
                className="text-slate-500 cursor-pointer"
                onClick={() => handleFav(product._id)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProducts;
