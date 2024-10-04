import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCart } from '../component/cartSlice.js';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const useFetchCart = (reload) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCart = async () => {
      if (!token) return;

      try {
        const decoded = jwtDecode(token);
        const userId = decoded.user.id;
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/auth/${userId}/mycart`);
        if(!response.ok){
          console.log(response.data.message)
        }
        const cartData = response.data;
        if(cartData.length > 0) {
          dispatch(setCart(cartData));
        }
        console.log('Cart data fetched:', cartData);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart(); // Fetch cart when component mounts or when reload changes
  }, [token, reload]);
};

export default useFetchCart;
