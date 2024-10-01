import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from './cartSlice.js';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from 'jwt-decode';
const ProductDetails = () => {
  const { isLoggedIn, accountType } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const decodedUser = jwtDecode(token);
      const userId = decodedUser.user.id;
      setUserId(userId);
    }
  }, [token]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async (product) => {
    const updatedCarts = cart.includes(product._id)
      ? cart.filter(id => id !== product._id)
      : [...cart, product._id]; // Add new item to cart

    setCart(updatedCarts);

    try {
      const response = await axios.put(`http://localhost:5000/api/products/updateCart/${userId}`, {
        cart: updatedCarts,
      });
      console.log(response.data);

      toast.success(cart.includes(product.id) ? "Removed from cart" : "Added to cart");
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
      id: product.id,
      name: product.productName,
      description: product.description,
      price: product.offerPrice,
      image: product.imageUrl
    }));
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center py-8">Product not found</div>;
  }

  return (
    <div className="bg-slate-200 min-h-auto py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row gap-8">
          <img
            src={product.imageUrl}
            alt={product.productName}
            className="h-96 w-96 object-cover mb-4 rounded-lg"
          />
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-primary mb-4">
              {product.productName}
            </h1>

            <p className="text-lg mb-4">₹{product.offerPrice}</p>
            <p className="text-lg line-through mb-4">₹{product.actualPrice}</p>
            <p className="text-md mb-4">{product.description}</p>
            <button
              onClick={() => { handleAddToCart(product) }}
              className="bg-primary w-40 text-white py-2 rounded-lg">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;