import React from 'react';
import StoreDisplay from './components/StoreDisplay';
import { useLocation } from 'react-router-dom';
import StoreFilters from './components/Storefilters/StoreFilters';
import { useGetStoresQuery } from '../../store/api/storeApi';

const StoreListPage = () => {
  const location = useLocation();
  const query = location.search;
  const { data: stores, isSuccess } = useGetStoresQuery(query);

  return (
    <>
      <StoreFilters />
      {isSuccess && <StoreDisplay stores={stores} />}
    </>
  );
};

export default StoreListPage;
