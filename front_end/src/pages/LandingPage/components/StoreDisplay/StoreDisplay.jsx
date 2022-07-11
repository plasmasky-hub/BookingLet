import React from 'react';
import StoreCategory from './StoreCategory';
import { useGetStoresQuery } from '../../../../store/api/storeApi';

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
