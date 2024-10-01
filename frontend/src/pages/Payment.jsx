import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaCheckCircle } from 'react-icons/fa';

function Payment() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const totalAmount = useSelector(state => state.cart.cart.reduce((total, item) => total + item.price * item.quantity, 0));

  const onSubmit = (data) => {
    // Simulate payment processing
    setTimeout(() => {
      setIsPaymentSuccessful(true);
      //   alert('Payment Successful!');
      //   navigate('/');
    }, 2000);
  };

  return (
    <div className='bg-slate-200 flex flex-col justify-center items-center min-h-screen w-full p-4'>
      <div className='w-full max-w-md bg-white p-6 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-semibold mb-4'>Payment Details</h2>
        <p className='text-xl font-semibold text-gray-700 mb-4'>Total Amount: {totalAmount}₹</p>
        {isPaymentSuccessful ? (
          <div className='flex flex-col items-center'>
            <FaCheckCircle className='text-green-500 text-6xl mb-4' />
            <p className='text-green-500 text-2xl font-semibold'>Hurray! Payment Success</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-4'>
              <label className='block text-gray-700 font-semibold mb-2'>Card Number</label>
              <input
                type='text'
                {...register('cardNumber', { required: 'Card number is required' })}
                className='w-full px-3 py-2 border rounded-lg'
                placeholder='1234 5678 9012 3456'
              />
              {errors.cardNumber && <p className='text-red-500 text-sm'>{errors.cardNumber.message}</p>}
            </div>
            <div className='flex gap-4 mb-4'>
              <div className='flex-1'>
                <label className='block text-gray-700 font-semibold mb-2'>Expiry Date</label>
                <input
                  type='text'
                  {...register('expiryDate', { required: 'Expiry date is required' })}
                  className='w-full px-3 py-2 border rounded-lg'
                  placeholder='MM/YY'
                />
                {errors.expiryDate && <p className='text-red-500 text-sm'>{errors.expiryDate.message}</p>}
              </div>
              <div className='flex-1'>
                <label className='block text-gray-700 font-semibold mb-2'>CVV</label>
                <input
                  type='text'
                  {...register('cvv', { required: 'CVV is required' })}
                  className='w-full px-3 py-2 border rounded-lg'
                  placeholder='123'
                />
                {errors.cvv && <p className='text-red-500 text-sm'>{errors.cvv.message}</p>}
              </div>
            </div>
            <button
              type='submit'
              className='w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors'
            >
              Pay Now
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Payment;
