import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";


import Checkout from "./pages/Checkout";
import ProductDetails from "./pages/ProductDetails"; // ✅ استيراد صفحة التفاصيل
import Footer from "./components/Footer/Footer";
import NavbarCommunity from "./components/NavbarCommunity/NavbarCommunity";
import ContactUs from "./components/ContactUs/ContactUs";
import AboutUs from "./components/AboutUs/AboutUs";



function App() {
  return (
    <Provider store={store}>


      <Router>
        <NavbarCommunity />

        <Routes>
          <Route path="/about" element={<AboutUs />} />  {/* ✅ About Us Route */}

          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<ContactUs />} /> {/* إضافة المسار */}

          <Route path="*" element={<Navigate to="/" />} /> {/* إعادة التوجيه إلى Home عند مسار غير معروف */}

          <Route path="/product/:id" element={<ProductDetails />} /> {/* ✅ إضافة مسار التفاصيل */}
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
