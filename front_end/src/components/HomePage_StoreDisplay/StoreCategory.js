import React from 'react';
import StoreCard from './StoreCard';
import './StoreCategory.css';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const StoreCategory = (props) => {
  return (
    <div className="container">
      <div className="header">
        <p className="title">{props.category}</p>
        <div className="view-all">
          <p>view</p>
          <ArrowForwardIcon className="icon" />
        </div>
      </div>
      <div className="cards">
        <StoreCard />
        <StoreCard />
        <StoreCard />
        <StoreCard />
      </div>
    </div>
  );
};

export default StoreCategory;
