import React from 'react';
import LandingPage from './pages/LandingPage';
import StoreListPage from './pages/StoreListPage';
import BookingPage from './pages/BookingPage';
import StoreLandingPage from './pages/StoreLandingPage';

import FavouriteStoreListPage from './pages/FavouriteStoreListPage';
import StoreSettingPage from './pages/StoreSettingPage';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StoreLandingPage />}></Route>
        <Route path="/LandingPage" element={<LandingPage />}></Route>
        <Route path="/StoreListPage" element={<StoreListPage />}></Route>
        <Route path="/BookingPage/:_id" element={<BookingPage />}></Route>

        <Route path="/StoreLandingPage" element={<StoreLandingPage />}></Route>

        <Route
          path="/FavouriteStoreListPage/:_id"
          element={<FavouriteStoreListPage />}
        ></Route>
        <Route
          path="/StoreSettingPage/:id"
          element={<StoreSettingPage />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
