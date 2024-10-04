import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {jwtDecode} from "jwt-decode"; // Corrected import statement
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import useUserData from "./useUserData.js";
import { IoIosHeart } from "react-icons/io";
import favorite from '../assets/favorite.png';

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const { isLoggedIn } = useSelector((state) => state.auth); // Assuming you have auth state
  const navigate = useNavigate(); // For the back button navigation
  const { favorites, setFavorites, userId } = useUserData();
  const [id, setId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!isLoggedIn || !token) return;
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.user.id;
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/auth/${userId}/myfavorites`
        );
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setProducts([]);
          console.log(error.response.data.message);
        }
        console.error("Error fetching user products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [favorites, setFavorites, userId, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleBack = () => {
    navigate(-1);
  };

  const handleRemoveFav = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/auth/removeFromFav/${userId}/${id}`
      );
      setId(id);
      console.log(response.data);
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return (
    <div className="w-full min-h-screen mx-auto p-4">

      {products && products.length > 0 ? (
        <div className="w-full flex flex-wrap gap-8 items-center justify-center p-8">
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
          {products.map((product) => (
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
              {favorites.includes(product._id) && (
                <IoIosHeart
                  size={32}
                  className="text-rose-500 cursor-pointer"
                  onClick={() => handleRemoveFav(product._id)}
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className='h-screen flex flex-col justify-center items-center'>
          <img className="w-20" src={favorite} alt="empty-cart" />
          <p className="text-lg font-semibold text-gray-700 mt-4">
          No favorite product available.
          </p>
        </div>
      )}
    </div>
  );
};

export default MyProducts;
