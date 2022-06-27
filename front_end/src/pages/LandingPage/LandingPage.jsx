import React from 'react';
import StoreDisplay from './components/StoreDisplay';
import LandingBanner from './components/LandingBaner';
import Register from './components/Register';
import Footer from '../../components/shared/Footer';

const LandingPage = () => (
  <div>
    <LandingBanner />
    <StoreDisplay />
    <Register />
    <Footer />
  </div>
);

export default LandingPage;
