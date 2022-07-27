import React from 'react';
import StoreDisplay from './components/StoreDisplay';
import { useLocation } from 'react-router-dom';
import StoreFilters from './components/Storefilters/StoreFilters';
import { useGetStoresQuery } from '../../store/api/storeApi';

const StoreListPage = () => {
  const location = useLocation();
  const storesData = useGetStoresQuery();

  //const { data: stores, isLoading, isSuccess, isError, error } = storesData;
  //const storesData = JSON.parse(useGetStoresQuery().currentData);

  let filteredStores = location.state.filteredStores;

  return (
    <>
      <StoreFilters />
      <StoreDisplay stores={filteredStores} />
    </>
  );
};

export default StoreListPage;
