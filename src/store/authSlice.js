import { createSlice } from "@reduxjs/toolkit";

// تحميل المستخدمين من localStorage عند بدء التطبيق
const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
const storedUser = JSON.parse(localStorage.getItem("currentUser")) || null;

// استعادة كارت المستخدم الحالي إذا كان مسجلاً
const storedCart = storedUser
  ? JSON.parse(localStorage.getItem(`cart_${storedUser.email}`)) || []
  : [];

const initialState = {
  users: storedUsers,
  currentUser: storedUser,
  isAuthenticated: !!storedUser,
  cart: storedCart, // تحميل عربة التسوق الخاصة بالمستخدم
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // ✅ إنشاء حساب جديد
    signUp: (state, action) => {
      const { email } = action.payload;
      const existingUser = state.users.find((user) => user.email === email);

      if (!existingUser) {
        state.users.push(action.payload);
        state.currentUser = action.payload;
        state.isAuthenticated = true;

        localStorage.setItem("users", JSON.stringify(state.users));
        localStorage.setItem("currentUser", JSON.stringify(action.payload));

        // ✅ إنشاء كارت جديد فارغ لهذا المستخدم
        localStorage.setItem(`cart_${email}`, JSON.stringify([]));
        state.cart = []; // تحديث حالة Redux
      }
    },

    // ✅ تسجيل الدخول
    logIn: (state, action) => {
      const { email, password } = action.payload;
      const user = state.users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        state.currentUser = user;
        state.isAuthenticated = true;
        localStorage.setItem("currentUser", JSON.stringify(user));

        // ✅ تحميل كارت المستخدم عند تسجيل الدخول
        const userCart = JSON.parse(localStorage.getItem(`cart_${email}`)) || [];
        state.cart = userCart; // تحديث حالة Redux
      }
    },

    // ✅ تسجيل الخروج
    logout: (state) => {
      if (state.currentUser) {
        // ✅ حفظ كارت المستخدم الحالي قبل تسجيل الخروج
        localStorage.setItem(
          `cart_${state.currentUser.email}`,
          JSON.stringify(state.cart)
        );
      }

      state.currentUser = null;
      state.isAuthenticated = false;
      state.cart = []; // تفريغ الكارت عند تسجيل الخروج
      localStorage.removeItem("currentUser");
    },

    // ✅ إضافة منتج إلى الكارت
    addToCart: (state, action) => {
      state.cart.push(action.payload);

      if (state.currentUser) {
        localStorage.setItem(
          `cart_${state.currentUser.email}`,
          JSON.stringify(state.cart)
        );
      }
    },

    // ✅ إزالة منتج من الكارت
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);

      if (state.currentUser) {
        localStorage.setItem(
          `cart_${state.currentUser.email}`,
          JSON.stringify(state.cart)
        );
      }
    },

    // ✅ تفريغ الكارت بالكامل
    clearCart: (state) => {
      state.cart = [];

      if (state.currentUser) {
        localStorage.setItem(
          `cart_${state.currentUser.email}`,
          JSON.stringify([])
        );
      }
    },
  },
});

export const { signUp, logIn, logout, addToCart, removeFromCart, clearCart } =
  authSlice.actions;
export default authSlice.reducer;
