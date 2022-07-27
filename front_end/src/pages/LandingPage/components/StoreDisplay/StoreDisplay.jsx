import React from 'react';
import StoreCategory from './StoreCategory';
// import { useGetStoresQuery } from '../../../../store/api/storeApi';
import { useGetRootCategoriesQuery } from '../../../../store/api/categoryApi';

const StoreDisplay = ({ data }) => {
  // const cardData = useGetStoresQuery();

  const categoryData = useGetRootCategoriesQuery();
  const {
    data: categories,
    isLoading,
    isSuccess,
    isError,
    error,
  } = categoryData;

  return (
    <>
      {isError && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {isSuccess && (
        <>
          {categories.map((category) => {
            return (
              <StoreCategory
                category={category}
                cardData={data}
                key={category._id}
                id={category._id}
              />
            );
          })}
        </>
      )}
    </>
  );
};

export default StoreDisplay;
