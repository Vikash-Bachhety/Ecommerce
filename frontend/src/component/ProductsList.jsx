import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { FaArrowRight } from 'react-icons/fa';
import {jwtDecode} from 'jwt-decode';
import { toast } from "react-toastify";

const ProductList = ({ id }) => { // Assuming userId is passed as prop
  const { category, subcategory } = useParams();
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [userId, setUserId] = useState(null);
  
  const token = localStorage.getItem("token");


  useEffect(()=>{
    if (token) {
      const decodedUser = jwtDecode(token);  
      const userId = decodedUser.user.id; 
      setUserId(userId); 
  }
},[])

  const handleFav = async (dealId) => {
      const updatedFavorites = favorites.includes(dealId)
          ? favorites.filter(id => id !== dealId) // Remove from favorites
          : [...favorites, dealId]; // Add to favorites

      setFavorites(updatedFavorites); // Update local state

      try {
          // Make API call to update favorites in the database
          const response = await axios.put(`http://localhost:5000/api/products/updateFavorites/${userId}`, {
              favorites: updatedFavorites,
          });
          console.log(response.data);
          // Notify user about the change
          toast.success(favorites.includes(dealId) ? "Removed from favorites" : "Added to favorites");
      } catch (error) {
          console.error('Error updating favorites', error);
          toast.error("Could not update favorites");
      }
  };

  useEffect(() => {
    if (category && subcategory) {
      axios.get(`http://localhost:5000/api/products/${category}/${subcategory}`)
        .then(response => setProducts(response.data))
        .catch(error => console.error('Error fetching products', error));
    }
  }, [category, subcategory]);

  return (
    <div className="bg-slate-200 w-full mx-auto p-4">
      {products.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-4">
          {products.map((deal) => (
            <div
              key={deal._id}
              className="bg-white w-60 p-3 flex flex-col rounded-lg shadow-sm border border-slate-100 hover:shadow-xl mb-6 w-full sm:w-[48%] lg:w-[32%]"
            >
              <img
                src={deal.imageUrl}
                alt={deal.productName}
                className="h-48 w-full object-cover mb-4 rounded-lg shadow-sm"
              />
              <div className="flex gap-5 items-center justify-between">
                <h3 className="text-xl font-semibold text-primary text-gray-800">
                  {deal.productName}
                </h3>
                {/* Heart Icon with Conditional Rendering */}
                {favorites.includes(deal._id) ? (
                  <IoIosHeart size={24} className="text-rose-500 cursor-pointer" onClick={() => handleFav(deal._id)} />
                ) : (
                  <IoIosHeartEmpty size={24} className="text-slate-500 cursor-pointer" onClick={() => handleFav(deal._id)} />
                )}
              </div>
              <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center text-teal-500 mb-3">
                <span className="text-2xl font-bold text-green-600 mb-2 sm:mb-0">
                  ₹{deal.offerPrice}
                </span>
                <span className="text-lg line-through text-gray-500 mb-2 sm:mb-0">
                  ₹{deal.actualPrice}
                </span>
                <span className="text-lg text-red-500 font-semibold">
                  {(((deal.actualPrice - deal.offerPrice) / deal.actualPrice) * 100).toFixed(0)}% Off
                </span>
              </div>
              <div className='w-full mb-4'>
                <p className="text-sm text-gray-600 leading-6 line-clamp-2">
                  {deal.description}
                </p>
              </div>
              <div className="flex items-start justify-between">
                <div className="text-sm text-gray-500">
                  <p>Shop: {deal.shop}</p>
                  <p>City: {deal.city}, {deal.state}</p>
                </div>
                <Link to={`/product/${deal._id}`} className="flex items-center mt-4 font-semibold text-blue-600 hover:text-blue-400 transition-colors">
                  View Product
                  <FaArrowRight className="ml-2 mt-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products found.</p>
      )}
    </div>
  );
};

export default ProductList;
