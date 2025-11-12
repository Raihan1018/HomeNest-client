import React from "react";
import Slider from "../../components/Slider/Slider";
import FeaturedProperties from "../../components/FeaturedProperties/FeaturedProperties";
import SubscribeUs from "../../components/SubcribeUs/SubcribeUs";
import WhyUs from "../../components/WhyUs/WhyUs";

const Home = () => {
  return (
    <div>
      <Slider />
      <FeaturedProperties />
      <SubscribeUs />
      <WhyUs/>
    </div>
  );
};

export default Home;
