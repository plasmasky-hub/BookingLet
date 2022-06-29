import React from 'react';
import { Header } from '../../components/shared/Header/Header';
import StoreDisplay from './components/StoreDisplay';
import LandingBanner from './components/LandingBaner';
import Register from './components/Register';
import Footer from '../../components/shared/Footer';

const LandingPage = () => (
  <div>
    <Header />
    <LandingBanner />
    <StoreDisplay />
    <Register />
    <Footer />
  </div>
);

export default LandingPage;
