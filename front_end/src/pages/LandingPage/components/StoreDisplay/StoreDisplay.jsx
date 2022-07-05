import React from 'react';
import StoreCategory from './StoreCategory';
import food from '../../../../assets/food.jpg';
import { useGetStoresQuery } from '../../../../api/apiSlice';

const StoreDisplay = () => {
  const cardData = useGetStoresQuery();

  return (
    <div>
      <StoreCategory category="Dining" cardData={cardData} />
      <StoreCategory category="Entertainment" cardData={cardData} />
      <StoreCategory category="Health&Beauty" cardData={cardData} />
      <StoreCategory category="Life Service" cardData={cardData} />
    </div>
  );
};

export default StoreDisplay;
