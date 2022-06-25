import React from "react";
import StoreDisplay from "./components/StoreDisplay";
import Banner from "./components/HomePageBanner";
import Register from "./components/Register";
import Footer from "../../components/shared/Footer";

const LandingPage = () => (
  <div>
    <Banner />
    <StoreDisplay />
    <Register />
    <Footer />
  </div>
);

export default LandingPage;
