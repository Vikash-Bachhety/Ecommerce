import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import useUserData from "./useUserData.js";
import useAddToCart from "./useAddtoCart.js";
import useAddFav from "./useAddFav.js";
import useFetchCart from "./useFetchCart.js";

const TopDeals = () => {
  const [deals, setDeals] = useState([]);
  const { accountType } = useSelector((state) => state.auth);
  const { cart, setCart, favorites, setFavorites, userId, loading } = useUserData();
  const { handleFav } = useAddFav(favorites, setFavorites, userId);
  const { handleAddToCart } = useAddToCart(cart, setCart, userId, accountType);

  useFetchCart();

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/products/topdeals"
        );
        const allProducts = response.data.flatMap((item) => item.products);
        const productsWithDiscount = allProducts.map((product) => {
          const discountPercentage = (
            ((product.actualPrice - product.offerPrice) / product.actualPrice) *
            100
          ).toFixed(0);

          return {
            ...product,
            discountPercentage: Number(discountPercentage),
          };
        });
        const sortedProducts = productsWithDiscount.sort(
          (a, b) => b.discountPercentage - a.discountPercentage
        );
        setDeals(sortedProducts);
      } catch (error) {
        console.error("Error fetching deals:", error);
      }
    };

    fetchDeals();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="bgAnimate bg-slate-200 min-h-auto py-4">
      <div className="mx-auto">
        <h2 className="text-3xl font-bold text-teal-500 mb-8 text-center">
          Top Deals
        </h2>
        <div className="flex flex-wrap gap-10 justify-center">
          {deals.map((deal) => (
            <div
              key={deal._id}
              className="bg-white min-w-40 w-72 h-92 p-3 flex-wrap rounded-lg shadow-md flex-col min-w-md flex"
            >
              <img
                src={deal.imageUrl}
                alt={deal.productName}
                className="h-40 w-full object-cover mb-4 rounded-lg"
              />
              <div className="flex gap-5 items-center justify-between">
                <h3 className="text-md font-semibold text-primary">
                  {deal.productName.split(" ").slice(0, 2).join(" ")}
                </h3>
                {favorites.includes(deal._id) ? (
                  <IoIosHeart
                    size={24}
                    className="text-rose-500 cursor-pointer"
                    onClick={() => handleFav(deal._id)}
                  />
                ) : (
                  <IoIosHeartEmpty
                    size={24}
                    className="text-slate-500 cursor-pointer"
                    onClick={() => handleFav(deal._id)}
                  />
                )}
              </div>
              <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center text-teal-500 mb-2">
                <span className="text-md font-semibold mb-2 sm:mb-0">
                  ₹{deal.offerPrice}
                </span>
                <span className="text-sm line-through mb-2 sm:mb-0">
                  ₹{deal.actualPrice}
                </span>
                <span className="text-md text-red-500 font-semibold">
                  {deal.discountPercentage}% Off
                </span>
              </div>
              <div className="w-full">
                <p className="line-clamp-2 text-sm mb-2 sm:mb-0">
                  {deal.description}
                </p>
              </div>
              <Link
                to={`/product/${deal._id}`}
                className="flex text-sm items-center font-semibold text-blue-500"
              >
                View Product
                <FaArrowRight className="ml-2 mt-1 text-blue-500" />
              </Link>

              {cart.includes(deal._id) ? (
                <button
                  onClick={() => {
                    handleAddToCart(deal);
                  }}
                  className="bg-orange-600 w-32 px-2 text-white text-sm py-1 rounded-lg mx-auto mt-4"
                >
                  Remove from cart
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleAddToCart(deal);
                  }}
                  className="bg-primary w-24 px-2 text-white text-sm py-1 rounded-lg mx-auto mt-4"
                >
                  Add to Cart
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopDeals;
