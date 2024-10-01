import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {jwtDecode} from 'jwt-decode';

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const { isLoggedIn } = useSelector((state) => state.auth); // Assuming you have auth state

  useEffect(() => {
    const fetchProducts = async () => {
      if (!isLoggedIn || !token) return;

      try {
        const decoded = jwtDecode(token);
        const userId = decoded.user.id;
        console.log(userId);
        const response = await axios.get(`http://localhost:5000/api/auth/${userId}/myproducts`);
        setProducts(response.data);
        console.log(response.data)
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

  if (products.length === 0) {
    return <div>No products found.</div>;
  }

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-teal-500 mb-8 text-center">My Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product._id.$oid} className="bg-white p-4 rounded-lg shadow-md">
            <img src={product.imageUrl} alt={product.productName} className="h-48 w-full object-cover mb-4 rounded-lg" />
            <h3 className="text-xl font-semibold text-primary">{product.productName}</h3>
            <p>Price: ₹{product.actualPrice}</p>
            <p>Offer Price: ₹{product.offerPrice}</p>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProducts;
