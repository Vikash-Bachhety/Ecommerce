import { createSlice } from "@reduxjs/toolkit";

const initialState = { cart: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const { id, name, description, price, image } = action.payload;
      const existingItem = state.cart.find(item => item.id === id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({
          id,
          name,
          description,
          price,
          image,
          quantity: 1
        });
      }
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter(item => item.id !== action.payload.id);
    },
    increaseQuantity(state, action) {
      const item = state.cart.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity(state, action) {
      const item = state.cart.find(item => item.id === action.payload.id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          // Remove item if quantity is 1 and decremented
          state.cart = state.cart.filter(item => item.id !== action.payload.id);
        }
      }
    }
  }
});

// Export actions for use in components
export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;

// Export reducer to be included in the store
export default cartSlice.reducer;
