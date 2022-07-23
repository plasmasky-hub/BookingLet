import React from 'react';
import LandingPage from './pages/LandingPage';
import StoreListPage from './pages/StoreListPage';
import BookingPage from './pages/BookingPage';
import FavouriteStoreListPage from './pages/FavouriteStoreListPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/LandingPage" element={<LandingPage />}></Route>
        <Route path="/StoreListPage" element={<StoreListPage />}></Route>
        <Route path="/BookingPage/:_id" element={<BookingPage />}></Route>
        <Route path="/FavouriteStoreListPage/:_id" element={<FavouriteStoreListPage />}></Route> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;