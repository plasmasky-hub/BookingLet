import React from 'react';
import StoreDisplay from './components/StoreDisplay';
import Layout from '../../components/shared/Layout/Layout';
import { useLocation } from 'react-router-dom';
import { Header } from '../../components/shared/Header/Header';
import StoreFilters from './components/Storefilters/StoreFilters';
import { useGetStoresQuery } from '../../store/api/storeApi'

const StoreListPage = () => {
  const location = useLocation();
  const storesData = useGetStoresQuery();
 
  //const { data: stores, isLoading, isSuccess, isError, error } = storesData;
  //const storesData = JSON.parse(useGetStoresQuery().currentData);

  let filteredStores = location.state.filteredStores

  
  return (
    <Layout>
      <Header />
      <StoreFilters />
      <StoreDisplay stores={filteredStores} />
    </Layout>
  );
};

export default StoreListPage;
