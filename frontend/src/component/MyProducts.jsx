import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";

const MyProducts = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const { isLoggedIn } = useSelector((state) => state.auth); // Assuming you have auth state
  const navigate = useNavigate(); // For the back button navigation

  useEffect(() => {
    const fetchProducts = async () => {
      if (!isLoggedIn || !token) return;

      try {
        const decoded = jwtDecode(token);
        const userId = decoded.user.id;
        const response = await axios.get(`http://localhost:5000/api/auth/${userId}/myproducts`);
        setCategories(response.data); // Now this is the list of categories with products
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [isLoggedIn, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (categories.length === 0) {
    return <div>No products found.</div>;
  }

  const handleEdit = (productId) => {
    navigate(`/edit-product/${productId}`); // Example navigation to edit page
  };

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

      {/* Products Heading */}
      <h2 className="text-3xl font-bold text-teal-500 mb-8 text-center">My Products</h2>

      {/* Products Grid */}
      <div className="w-full flex flex-wrap gap-8 items-center justify-center p-8">
        {categories.map((categoryItem) => (
          categoryItem.products.map((product) => (
            <div key={product._id} className="bg-white min-w-sm w-96 h-auto p-3 flex-wrap rounded-lg shadow-md flex-col min-w-md flex">
              <img
                src={product.imageUrl}
                alt={product.productName}
                className="h-48 w-full object-cover mb-4 rounded-lg"
              />
              <h3 className="text-xl font-semibold text-primary mb-2">{product.productName}</h3>
              <p className="text-gray-700 mb-2"><b>Price</b>: ₹{product.actualPrice}</p>
              <p className="text-gray-700 mb-2"><b>Offer Price</b>: ₹{product.offerPrice}</p>
              <p className="text-gray-600 mb-4"><b>Description</b>:{product.description}</p>
              <p className="text-gray-500 mb-2"><b>Brand</b>: {product.brand}</p>
              <p className="text-gray-500 mb-2"><b>Shop</b>: {product.shop}</p>
              <p className="text-gray-500 mb-2"><b>Category</b>: {categoryItem.category}</p>
              <p className="text-gray-500 mb-2"><b>Subcategory</b>: {product.subcategory}</p>
              <p className="text-gray-500 mb-2"><b>City</b>: {product.city}</p>
              <p className="text-gray-500 mb-2"><b>State</b>: {product.state}</p>
              <p className="text-gray-500 mb-4"><b>Address</b>: {product.address}</p>

              {/* Edit Button */}
              <button
                onClick={() => handleEdit(product._id)}
                className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition duration-300 w-32 mx-auto"
              >
                Edit
              </button>

              {/* Timestamps */}
              <div className="text-gray-400 mt-2 text-sm">
                <p>Added: {new Date(categoryItem.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))
        ))}
      </div>
    </div>
  );
};

export default MyProducts;
