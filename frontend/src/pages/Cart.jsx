// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { removeFromCart, increaseQuantity, decreaseQuantity } from '../component/cartSlice.js';
// import empty from '../assets/empty.png';
// import { useNavigate } from 'react-router-dom';
// import { MdOutlineDeleteOutline } from "react-icons/md";

// function Cart() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const cart = useSelector(state => state.cart.cart);
//   // console.log(cart);

//   const handleRemoveFromCart = (id) => {
//     dispatch(removeFromCart({ id }));
//   };

//   const handleIncreaseQuantity = (id) => {
//     dispatch(increaseQuantity({ id }));
//   };

//   const handleDecreaseQuantity = (id) => {
//     dispatch(decreaseQuantity({ id }));
//   };

//   const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

//   return (
//     <div className='flex flex-col justify-start items-center min-h-screen w-full bg-slate-300 p-4'>
//       {cart && cart.length > 0 ? (
//         <>
//           {cart.map((product) => (
//             <div key={product._id} className='flex flex-col sm:flex-row justify-between px-4 sm:px-6 lg:px-8 bg-white rounded-lg shadow-lg overflow-hidden my-2 w-full max-w-4xl'>
//               <div className='py-4 flex-1'>
//                 {/* <p className='text-gray-600 mb-4 text-sm'>{product.description}</p> */}
//                 <h2 className='text-slate-600 text-md font-medium mb-2'>{product.name}</h2>
//                 <img src={product.image} alt={product.name} className='w-20 object-cover rounded-md' />
//               </div>
//               <div className='py-4 flex-1 flex flex-col sm:flex-row items-center justify-between'>
//                 <p className='text-blue-400 text-xl px-10 font-semibold mb-2 sm:mb-0'>{product.price}₹</p>
//                 <div className='flex items-center gap-2 mx-5'>
//                   <h2 className='text-slate-600 text-md font-medium my-2'>Quantity</h2>
//                   <button
//                     onClick={() => handleDecreaseQuantity(product.id)}
//                     className='bg-red-400 text-white px-2 pb-0.5 rounded-full font-bold hover:bg-red-500 transition-colors'
//                   >
//                     -
//                   </button>
//                   {product.quantity}
//                   <button
//                     onClick={() => handleIncreaseQuantity(product.id)}
//                     className='bg-green-400 text-white px-1.5 pb-0.5 rounded-full font-bold hover:bg-green-500 transition-colors'
//                   >
//                     +
//                   </button>
//                 </div>
//                   <MdOutlineDeleteOutline  
//                   onClick={() => handleRemoveFromCart(product.id)}
//                   size={30}/>
//               </div>
//             </div>
//           ))}
//           <div className='w-full max-w-4xl flex justify-end px-4 sm:px-6 lg:px-8 py-2 bg-white rounded-lg shadow-lg mt-4'>
//             <p className='text-2xl font-semibold text-blue-400'>Total: {totalAmount}₹</p>
//           </div>
//           <button
//             onClick={() => navigate('/payment')}
//             className='p-2 bg-blue-700 mt-5 text-slate-50 font-semibold hover:bg-blue-500 rounded-md'>
//             Proceed to Checkout
//           </button>
//         </>
//       ) : (
//         <div className='h-screen flex flex-col justify-center items-center'>
//           <img className='w-20' src={empty} alt="empty-cart" />
//           <p className='text-lg font-semibold text-gray-700'>Your cart is empty.</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Cart;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode"; // Removed curly braces for correct import
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import useUserData from "../component/useUserData.js";

import useAddToCart from "../component/useAddtoCart.js";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";

const MyProducts = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const { isLoggedIn } = useSelector((state) => state.auth); // Assuming you have auth state
const { accountType } = useSelector((state) => state.auth);
  const navigate = useNavigate(); // For the back button navigation
  const { cart, setCart, userId } = useUserData();
  const { handleAddToCart } = useAddToCart(cart, setCart, userId, accountType);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!isLoggedIn || !token) return;
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.user.id;
        const response = await axios.get(
          `http://localhost:5000/api/auth/${userId}/mycart`
        );
        setCategories(response.data);
        console.log(response.data)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [cart]); // <-- Added `favorites` as a dependency

  if (loading) {
    return <div>Loading...</div>;
  }

  if (categories.length === 0) {
    return <div>No products found.</div>;
  }

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

      <h2 className="text-3xl font-bold text-teal-500 mb-8 text-center">
        My Favorites
      </h2>

      <div className="w-full flex flex-wrap gap-8 items-center justify-center p-8">
        {categories.map((product) => (
          <div
            key={product._id}
            className="bg-white min-w-sm w-96 h-auto p-3 flex-wrap rounded-lg shadow-md flex-col min-w-md flex"
          >
            <img
              src={product.imageUrl}
              alt={product.productName}
              className="h-48 w-full object-cover mb-4 rounded-lg"
            />
            <h3 className="text-xl font-semibold text-primary mb-2">
              {product.productName}
            </h3>
            <p className="text-gray-700 mb-2">
              <b>Price</b>: ₹{product.actualPrice}
            </p>
            <p className="text-gray-700 mb-2">
              <b>Offer Price</b>: ₹{product.offerPrice}
            </p>
            <p className="text-gray-600 mb-4">
              <b>Description</b>: {product.description}
            </p>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProducts;
