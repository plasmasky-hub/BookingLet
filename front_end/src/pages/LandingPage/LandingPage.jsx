import React from 'react';
import { Header } from '../../components/shared/Header/Header';
import StoreDisplay from './components/StoreDisplay';
import LandingBanner from './components/LandingBaner';
import Register from './components/Register';
import Footer from '../../components/shared/Footer';
import { useState } from 'react';
import { useGetStoresQuery } from '../../store/api/storeApi';

const LandingPage = () => {
  const [FormData, setFormData] = useState({
    date: new Date(),
    category: '',
    state: '',
    search: '',
    isSearch: false,
    q: '',
  });
  const query = FormData.isSearch ? FormData.q : '';
  const { data, isSuccess } = useGetStoresQuery(query);

  return (
    <div>
      <Header />
      <LandingBanner FormData={FormData} setFormData={setFormData} />
      {isSuccess && <StoreDisplay data={data} />}
      <Register />
      <Footer />
    </div>
  );
};

export default LandingPage;
