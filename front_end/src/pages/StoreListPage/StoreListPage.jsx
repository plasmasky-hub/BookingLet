import React from 'react';
import StoreDisplay from './components/StoreDisplay';
import Layout from '../../components/shared/Layout/Layout';
import { useLocation } from 'react-router-dom';
import { Header } from '../../components/shared/Header/Header';

const StoreListPage = () => {
  const location = useLocation();
  return (
    <Layout>
      <Header />
      <StoreDisplay stores={location.state.stores} />
    </Layout>
  );
};

export default StoreListPage;
