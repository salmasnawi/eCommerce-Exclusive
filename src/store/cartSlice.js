import { createSlice } from "@reduxjs/toolkit"; 

const storedCarts = JSON.parse(localStorage.getItem("userCarts")) || {};

const initialState = {
  userCarts: storedCarts, 
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { userId, product } = action.payload;
      if (!state.userCarts[userId]) {
        state.userCarts[userId] = [];
      }

      const existingProduct = state.userCarts[userId].find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.userCarts[userId].push({ ...product, quantity: 1 });
      }

      localStorage.setItem("userCarts", JSON.stringify(state.userCarts));
      localStorage.setItem("cart", JSON.stringify(state.userCarts[userId])); 
    },

    removeFromCart: (state, action) => {
      const { userId, productId } = action.payload;
      if (state.userCarts[userId]) {
        state.userCarts[userId] = state.userCarts[userId].filter(item => item.id !== productId);
      }

      localStorage.setItem("userCarts", JSON.stringify(state.userCarts));
      localStorage.setItem("cart", JSON.stringify(state.userCarts[userId] || []));
    },

    updateCartItem: (state, action) => {
      const { userId, productId, quantity } = action.payload;
      if (state.userCarts[userId]) {
        const item = state.userCarts[userId].find(item => item.id === productId);
        if (item) {
          item.quantity = quantity;
        }
      }

      localStorage.setItem("userCarts", JSON.stringify(state.userCarts));
      localStorage.setItem("cart", JSON.stringify(state.userCarts[userId] || []));
    },

    // ✅ إصلاح المشكلة بإضافة `setCartFromStorage`
    setCartFromStorage: (state, action) => {
      const { userId } = action.payload;
      const storedCart = JSON.parse(localStorage.getItem("userCarts")) || {};
      state.userCarts[userId] = storedCart[userId] || [];
    },
  },
});

export const { addToCart, removeFromCart, updateCartItem, setCartFromStorage } = cartSlice.actions;
export default cartSlice.reducer;
