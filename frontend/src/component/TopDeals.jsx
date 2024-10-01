import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { FaArrowRight } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {jwtDecode} from 'jwt-decode';  // Correct import for jwt-decode
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from './cartSlice.js';

const TopDeals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [userId, setUserId] = useState(null);
  const [cart, setCart] = useState([]);
  const { isLoggedIn, accountType } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Decode token to get userId
  useEffect(() => {
    if (token) {
      const decodedUser = jwtDecode(token);
      const Id = decodedUser.user.id;
      setUserId(Id);
    }
  }, [token]);

  // Fetch user cart and favorites from backend when component loads
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId) {
          // Fetch the user's cart and favorites
          const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
          setCart(response.data.cart || []);
          setFavorites(response.data.favorites || []);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  // Fetch top deals
  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/topdeals');
        const allProducts = response.data.flatMap(item => item.products);
        const productsWithDiscount = allProducts.map(product => {
          const discountPercentage = (
            ((product.actualPrice - product.offerPrice) / product.actualPrice) * 100
          ).toFixed(0);

          return {
            ...product,
            discountPercentage: Number(discountPercentage)
          };
        });
        const sortedProducts = productsWithDiscount.sort((a, b) => b.discountPercentage - a.discountPercentage);
        setDeals(sortedProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching deals:', error);
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  const handleAddToCart = async (deal) => {
    const updatedCarts = cart.includes(deal._id)
      ? cart.filter(id => id !== deal._id) // Remove from cart
      : [...cart, deal._id]; // Add new item to cart

    setCart(updatedCarts); // Update local state

    try {
      await axios.put(`http://localhost:5000/api/products/updateCart/${userId}`, {
        cart: updatedCarts,
      });

      toast.success(cart.includes(deal._id) ? "Removed from cart" : "Added to cart");
    } catch (error) {
      console.error('Error updating cart', error);
      toast.error("Could not update cart");
    }

    if (!isLoggedIn) {
      navigate('/signin');
      return;
    } else if (isLoggedIn && accountType === 'business') {
      toast.warn("This is a business account!");
      return;
    }

    dispatch(addToCart({
      id: deal._id,
      name: deal.productName,
      description: deal.description,
      price: deal.offerPrice,
      image: deal.imageUrl
    }));
  };

  const handleFav = async (dealId) => {
    const updatedFavorites = favorites.includes(dealId)
      ? favorites.filter(id => id !== dealId) // Remove from favorites
      : [...favorites, dealId]; // Add to favorites

    setFavorites(updatedFavorites); // Update local state

    try {
      await axios.put(`http://localhost:5000/api/products/updateFavorites/${userId}`, {
        favorites: updatedFavorites,
      });

      toast.success(favorites.includes(dealId) ? "Removed from favorites" : "Added to favorites");
    } catch (error) {
      console.error('Error updating favorites', error);
      toast.error("Could not update favorites");
    }
  };

  return (
    <div className="bg-slate-200g min-h-auto py-4">
      <div className=" mx-auto">
        <h2 className="text-3xl font-bold text-teal-500 mb-8 text-center">
          Top Deals
        </h2>
        <div className="flex flex-wrap gap-10 justify-center">
          {deals.map((deal) => (
            <div
              key={deal._id}
              className="bg-white min-w-40 w-72 h-92 p-3 flex-wrap rounded-lg shadow-md flex flex-col min-w-md flex"
            >
              <img
                src={deal.imageUrl}
                alt={deal.productName}
                className="h-40 w-full object-cover mb-4 rounded-lg"
              />
              <div className="flex gap-5 items-center justify-between">
                <h3 className="text-md font-semibold text-primary text-gray-800">
                  {deal.productName.split(" ").slice(0,2).join(" ")}
                </h3>
                {favorites.includes(deal._id) ? (
                  <IoIosHeart size={24} className="text-rose-500 cursor-pointer" onClick={() => handleFav(deal._id)} />
                ) : (
                  <IoIosHeartEmpty size={24} className="text-slate-500 cursor-pointer" onClick={() => handleFav(deal._id)} />
                )}
              </div>
              <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center text-teal-500 mb-2">
                <span className="text-md font-semibold mb-2 sm:mb-0">₹{deal.offerPrice}</span>
                <span className="text-sm line-through mb-2 sm:mb-0">₹{deal.actualPrice}</span>
                <span className="text-md text-red-500 font-semibold">
                  {deal.discountPercentage}% Off
                </span>
              </div>
              <div className='w-full'>
                <p className="line-clamp-2 text-sm mb-2 sm:mb-0">{deal.description}</p>
              </div>
              <Link to={`/product/${deal._id}`} className="flex text-sm items-center font-semibold text-blue-500">
                View Product
                <FaArrowRight className="ml-2 mt-1 text-blue-500" />
              </Link>

              {cart.includes(deal._id) ? (
                <button
                  onClick={() => { handleAddToCart(deal) }}
                  className="bg-orange-600 w-32 px-2 text-white text-sm py-1 rounded-lg mx-auto mt-4">
                  Remove from cart
                </button>
              ) : (
                <button
                  onClick={() => { handleAddToCart(deal) }}
                  className="bg-primary w-24 px-2 text-white text-sm py-1 rounded-lg mx-auto mt-4">
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
