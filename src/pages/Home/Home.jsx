import React from "react";
import Slider from "../../components/Slider/Slider";
import FeaturedProperties from "../../components/FeaturedProperties/FeaturedProperties";
import SubscribeUs from "../../components/SubcribeUs/SubcribeUs";

const Home = () => {
  return (
    <div>
      <Slider />
      <FeaturedProperties />
      <SubscribeUs />
    </div>
  );
};

export default Home;
