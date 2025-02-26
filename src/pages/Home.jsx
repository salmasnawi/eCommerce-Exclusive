import React from "react";
import Hero from "../components/Hero/Hero";
import FlashSales from "../components/FlashSales/FlashSales";
import BrowseByCategory from "../components/BrowseByCategory/BrowseByCategory";
import BestSellingProducts from "../components/BestSellingProducts/BestSellingProducts";
import Explore from "../components/Explore/Explore";
import FeaturedSection from "../components/FeaturedSection/FeaturedSection";

const Home = () => {
  return (
    <div>
      <Hero />
      <FlashSales />
      <BrowseByCategory />
      <BestSellingProducts />
      <Explore />
      <FeaturedSection />
    </div>
  );
};

export default Home;