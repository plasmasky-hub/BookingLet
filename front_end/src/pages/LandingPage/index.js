import React from "react";
import Banner from "../../components/HomePage-banner";
import Highlights from "../../components/filter/index";
import Register from "../../components/Register";
import Footer from "../../components/Footer";
import StoreDisplay from "../../components/HomePage_StoreDisplay/StoreDisplay";
import Header from "../Login_Header/Login_Header";

const LandingPage = () => (
  <div className="wrapper">
    <div>
      <div>
        <Header />
        <Banner />
        <StoreDisplay />
        <Register />
        <Footer />
      </div>
    </div>
  </div>
);

export default LandingPage;
