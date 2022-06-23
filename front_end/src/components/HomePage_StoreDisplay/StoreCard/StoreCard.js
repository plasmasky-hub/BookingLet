import React, { useState } from 'react';
import { Card } from '@mui/material';
import food from '../food.jpg';
import StarIcon from '@mui/icons-material/Star';
import './StoreCard.css';

const StoreCard = () => {
  const [color, setColor] = useState('white');
  const changeColor = () => {
    setColor('#f2c230');
  };
  return (
    <Card className="card">
      <div className="image-box">
        <img src={food} alt="food" className="image" />
        <StarIcon
          className="save-icon"
          onClick={changeColor}
          sx={{ color: { color } }}
        />
        <span className="label_ava">AVAILABLE TODAY</span>
      </div>
      <p className="store-name">Kung Fu Chinese Cuisine</p>
      <p className="address">2000 Sydney NSW</p>
      <div className="label_detail">
        <span className="label">Service list available</span>
        <span className="label">Max 8 ppl.</span>
      </div>
      <p className="add-number">647 people add to booklet</p>
      <a className="book-now" href="google">
        Book Now
      </a>
    </Card>
  );
};

export default StoreCard;
