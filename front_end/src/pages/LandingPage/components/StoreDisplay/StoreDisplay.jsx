import React from 'react';
import StoreCategory from './StoreCategory';
import food from '../../../../assets/food.jpg';

const diningData = [
  {
    image: food,
    avl: 'block',
    name: 'Kung Fu Chinese Cuisine',
    address: '2000 Sydney NSW',
    svList: 'inline-block',
    maxPpl: '8',
    addPpl: '647',
  },
  {
    image: food,
    avl: 'block',
    name: 'Time for Thai',
    address: '2032 Kingsford NSW',
    svList: 'none',
    maxPpl: '4',
    addPpl: '232',
  },
  {
    image: food,
    avl: 'none',
    name: 'Dumpling Planet',
    address: '5000 Adelaide SA',
    svList: 'inline-block',
    maxPpl: '8',
    addPpl: '1245',
  },
  {
    image: food,
    avl: 'block',
    name: 'Sushi Gallery',
    address: '2000 Sydney NSW',
    svList: 'inline-block',
    maxPpl: '4',
    addPpl: '355',
  },
];

const StoreDisplay = () => {
  return (
    <div>
      <StoreCategory category="Dining" cardData={diningData} />
      <StoreCategory category="Entertainment" cardData={diningData} />
      <StoreCategory category="Health&Beauty" cardData={diningData} />
      <StoreCategory category="Life Service" cardData={diningData} />
    </div>
  );
};

export default StoreDisplay;
