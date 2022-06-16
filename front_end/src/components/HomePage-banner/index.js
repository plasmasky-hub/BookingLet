import React from "react";
import SelectVariants from "../filter/index";
import CustomizedInputBase from "../searchBar";
import "./styles.css";

const Banner = () => (
  <div className="wrapper">
    <div className="container">
      <div className="font">What would you like to book today?</div>

      <div className="searchButton">
        <SelectVariants />
      </div>

      <div><CustomizedInputBase/></div>

      <button type="button" className="button" onClick={() => {}}>
        SEARCH
      </button>
    </div>
  </div>
);

export default Banner;
