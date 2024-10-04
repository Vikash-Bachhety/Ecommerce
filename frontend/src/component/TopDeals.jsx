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
import { useNavigate } from "react-router-dom";

const TopDeals = () => {
  const [deals, setDeals] = useState([]);
  const { accountType } = useSelector((state) => state.auth);
  const { cart, setCart, favorites, setFavorites, userId, loading } = useUserData();
  const { handleFav } = useAddFav(favorites, setFavorites, userId);
  const { handleAddToCart } = useAddToCart(cart, setCart, userId, accountType);
  const navigate = useNavigate();

  useFetchCart();

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await axios.get(
          `https://omnimart.up.railway.app/api/products/topdeals`
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

  const handleProductClick = (id)=> {
    navigate(`/product/${id}`)
  }

  return (
    <div className="bg-yellow-100 min-h-auto pb-6 m-2">
      <div className="mx-auto">
        <h2 className="text-2xl font-bold p-2 mb-2">
          Top Deals
        </h2>
        <div className="flex flex-wrap gap-5 justify-center">
          {deals.map((deal) => (
            <div
              key={deal._id}
              className="bg-white min-w-40 w-72 h-72 p-4 flex-wrap rounded-sm shadow-md flex-col min-w-md flex"
              >
              <img
                src={deal.imageUrl}
                onClick={()=>{handleProductClick(deal._id)}}
                alt={deal.productName}
                className="h-40 w-full mb-2 object-cover rounded-lg"
              />
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-800">
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
              <div className="w-full flex flex-col sm:flex-row mt-1 justify-between items-start sm:items-center">
                <span className="text-md font-semibold mb-2 sm:mb-0">
                  ₹{deal.offerPrice.toFixed(2)}
                </span>
                <span className="text-sm text-slate-700 line-through mb-2 sm:mb-0">
                  M.R.P ₹{deal.actualPrice.toFixed(2)}
                </span>
                <span className="text-sm text-red-500 bg-rose-500 text-white px-2 rounded-sm font-semibold">
                  {deal.discountPercentage}% Off
                </span>
              </div>
              {/* <div className="w-full">
                <p className="line-clamp-2 text-sm mb-2 sm:mb-0">
                  {deal.description}
                </p>
              </div> */}
              {/* <Link
                to={`/product/${deal._id}`}
                className="flex text-sm items-center font-semibold text-blue-500"
              >
                View Product
                <FaArrowRight className="ml-2 mt-1 text-blue-500" />
              </Link> */}

              {cart.includes(deal._id) ? (
                <button
                  onClick={() => {
                    handleAddToCart(deal);
                  }}
                  className="bg-orange-600 w-32 px-2 text-white text-sm py-1 rounded-lg mx-auto mt-2"
                >
                  Remove from cart
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleAddToCart(deal);
                  }}
                  className="bg-primary w-24 px-2 text-white text-sm py-1 rounded-lg mx-auto mt-2"
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
