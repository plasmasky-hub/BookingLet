import React from 'react';
import StoreCategory from './StoreCategory/StoreCategory';

function StoreDisplay() {
  return (
    <div>
      <StoreCategory category="Dining" />
      <StoreCategory category="Entertainment" />
      <StoreCategory category="Health&Beauty" />
      <StoreCategory category="Life Service" />
    </div>
  );
}

export default StoreDisplay;
