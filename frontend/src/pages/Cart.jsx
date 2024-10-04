import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity } from '../component/cartSlice.js';
import empty from '../assets/empty.png';
import { useNavigate } from 'react-router-dom';
import { MdOutlineDeleteOutline } from "react-icons/md";
import useFetchCart from '../component/useFetchCart';
import useUserData from '../component/useUserData.js';
import axios from 'axios';
import { setCart } from '../component/cartSlice.js';

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart.cart);
  const { userId } = useUserData();

  const [reload, setReload] = useState(false);

  useFetchCart(reload);

  const handleRemoveFromCart = async (id) => {
    try {
      const response = await axios.delete(`https://omnimart.up.railway.app/api/auth/removeFromCart/${userId}/${id}`);
      console.log("Item removed:", response.data);

      if (response.data.length === 0) {
        dispatch(setCart([]));
      }
      setReload(prev => !prev);
    } catch (error) {
      console.error("Error removing from cart:", error.response?.data || error.message);
    }
  };

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity({ id }));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity({ id }));
  };

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className='flex flex-col justify-start items-center min-h-screen w-full bg-slate-300 p-4'>
      {cart && cart.length > 0 ? (
        <div>
          {cart.map((product) => (
            <div key={product._id} className='flex flex-col h-32 sm:flex-row border border-slate-600 justify-between px-4 sm:px-6 lg:px-8 bg-white rounded-lg shadow-lg overflow-hidden my-2 w-full max-w-4xl'>
              <div className='py-4 flex-1'>
                <h2 className='text-slate-600 text-md font-medium mb-2'>{product.name}</h2>
                <img src={product.image} alt={product.name} className='w-28 h-16 object-cover rounded-md' />
              </div>
              <div className='py-4 flex-1 flex flex-col sm:flex-row items-center justify-between'>
                <p className='text-blue-400 text-xl px-10 font-semibold mb-2 sm:mb-0'>{product.price}₹</p>
                <div className='flex items-center gap-2 mx-5'>
                  <h2 className='text-slate-600 text-md font-medium my-2'>Quantity</h2>
                  <button
                    onClick={() => handleDecreaseQuantity(product.id)}
                    className='bg-red-400 text-white px-2 pb-0.5 rounded-full font-bold hover:bg-red-500 transition-colors'
                  >
                    -
                  </button>
                  {product.quantity}
                  <button
                    onClick={() => handleIncreaseQuantity(product.id)}
                    className='bg-green-400 text-white px-1.5 pb-0.5 rounded-full font-bold hover:bg-green-500 transition-colors'
                  >
                    +
                  </button>
                </div>
                <MdOutlineDeleteOutline
                  className='cursor-pointer'
                  onClick={() => handleRemoveFromCart(product.id)}
                  size={30}
                />
              </div>
            </div>
          ))}
          <div className='w-full max-w-4xl flex justify-end px-4 sm:px-6 lg:px-8 py-2 bg-white rounded-lg shadow-lg mt-4'>
            <p className='text-2xl font-semibold text-blue-400'>Total: {totalAmount}₹</p>
          </div>
          <button
            onClick={() => navigate('/payment')}
            className='p-2 bg-blue-700 w-full mx-auto mt-5 text-slate-50 font-semibold hover:bg-blue-500 rounded-md'>
            Proceed to Checkout
          </button>
        </div>
      ) : (
        <div className='h-screen flex flex-col justify-center items-center'>
          <img className='w-20' src={empty} alt="empty-cart" />
          <p className='text-lg font-semibold text-gray-700'>Your cart is empty.</p>
        </div>
      )}
    </div>
  );
}

export default Cart;
