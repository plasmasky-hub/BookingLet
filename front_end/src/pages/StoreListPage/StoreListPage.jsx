import React from 'react';
import styled from 'styled-components';
import StoreDisplay from './components/StoreDisplay';
import { useLocation } from 'react-router-dom';
import StoreFilters from './components/Storefilters/StoreFilters';
import { useGetStoresQuery } from '../../store/api/storeApi';
import bannerbg from '../../assets/sushi.png';

const StoreResultBanner = styled.div`
  width: 100vw;
  margin-left: calc((1240px - 100vw) / 2);
  padding: 0 20px;
  height: 360px;
  box-sizing: border-box;
  background-image: url(${bannerbg});
  background-repeat: no-repeat;
  background-size: cover;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const StoreListPage = () => {
  const location = useLocation();
  const query = location.search;
  const { data: stores, isSuccess } = useGetStoresQuery(query);
  console.log(query);

  //const { data: stores, isLoading, isSuccess, isError, error } = storesData;
  //const storesData = JSON.parse(useGetStoresQuery().currentData);

  return (
    <>
      <StoreResultBanner />
      <StoreFilters />
      {isSuccess && <StoreDisplay stores={stores} />}
    </>
  );
};

export default StoreListPage;
