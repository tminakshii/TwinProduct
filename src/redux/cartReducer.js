import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find(item => item.productId === action.payload.productId);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalAmount += action.payload.price;
    },
    removeFromCart: (state, action) => {
      const item = state.items.find(item => item.productId === action.payload);
      if (item) {
        state.totalAmount -= item.price * item.quantity;
        state.items = state.items.filter(item => item.productId !== action.payload);
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find(item => item.productId === action.payload);
      if (item) {
        item.quantity += 1;
        state.totalAmount += item.price;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find(item => item.productId === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalAmount -= item.price;
      } else {
        state.totalAmount -= item.price;
        state.items = state.items.filter(item => item.productId !== action.payload);
      }
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
