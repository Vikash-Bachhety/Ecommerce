import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import { FaArrowRight } from 'react-icons/fa';
import { toast } from 'react-toastify';

const TopDeals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]); // Initialize an empty array for favorites

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


  const handleFav = (dealId) => {
      // Check if the deal is already in favorites
      if (favorites.includes(dealId)) {
          // If yes, remove it from favorites
          setFavorites(favorites.filter(id => id !== dealId));
          toast.error("Removed from favorites"); // Notify user
      } else {
          // If no, add it to favorites
          setFavorites([...favorites, dealId]);
          toast.success("Added to favorites"); // Notify user
      }
  };

  return (
    <div className="bg-slate-200g min-h-auto py-4">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-teal-500 mb-8 text-center">
          Top Deals
        </h2>
        <div className="flex flex-wrap gap-8 justify-center">
          {deals.map((deal) => (
            <div
              key={deal._id}
              className="bg-white min-w-80 w-96 p-4 flex-wrap rounded-lg shadow-md flex flex-col min-w-md flex"
            >
              <img
                src={deal.imageUrl}
                alt={deal.productName}
                className="h-48 w-full object-cover mb-4 rounded-lg"
              />
             <div className="flex gap-5 items-center justify-between">
                <h3 className="text-xl font-semibold text-primary text-gray-800">
                  {deal.productName}
                </h3>
                {favorites.includes(deal._id) ? (
                  <IoIosHeart size={24} className="text-rose-500 cursor-pointer" onClick={() => handleFav(deal._id)} />
                ) : (
                  <IoIosHeartEmpty size={24} className="text-slate-500 cursor-pointer" onClick={() => handleFav(deal._id)} />
                )}
              </div>
              <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center text-teal-500 mb-2">
                <span className="text-lg font-bold mb-2 sm:mb-0">₹{deal.offerPrice}</span>
                <span className="text-sm line-through mb-2 sm:mb-0">₹{deal.actualPrice}</span>
                <span className="text-md text-red-500 font-semibold">
                  {deal.discountPercentage}% Off
                </span>
              </div>
              <div className='w-full'>
                <p className="truncate text-sm mb-2 sm:mb-0">{deal.description}</p>
              </div>
              <Link to={`/product/${deal._id}`} className="flex items-center mt-4 font-semibold text-blue-500">
                View Product
                <FaArrowRight className="ml-2 mt-1 text-blue-500" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopDeals;
