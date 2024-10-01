import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from './cartSlice.js';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
  const { isLoggedIn, accountType } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate('/signin');
      return;
    }
    else if (isLoggedIn && accountType === 'business') {
      toast.warn("This is business account !")
    }

    if (product) {
      dispatch(addToCart({
        id,
        name: product.productName,
        description: product.description,
        price: product.offerPrice,
        image: product.imageUrl
      }));
    } else {
      console.error('Product not found');
    }
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
              onClick={handleAddToCart}
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