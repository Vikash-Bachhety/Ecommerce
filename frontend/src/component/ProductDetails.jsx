import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import useUserData from "./useUserData.js";
import useAddToCart from "./useAddtoCart.js";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { accountType } = useSelector((state) => state.auth);
  const { cart, setCart, userId, loading } = useUserData();
  const { handleAddToCart } = useAddToCart(cart, setCart, userId, accountType);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${REACT_APP_API_BASE_URL}/api/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

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
            {cart.includes(product._id) ? (
                <button
                  onClick={() => { handleAddToCart(product) }}
                  className="bg-orange-600 w-32 px-2 text-white text-sm py-1 rounded-lg mx-auto mt-4">
                  Remove from cart
                </button>
              ) : (
                <button
                  onClick={() => { handleAddToCart(product) }}
                  className="bg-primary w-24 px-2 text-white text-sm py-1 rounded-lg mx-auto mt-4">
                  Add to Cart
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
