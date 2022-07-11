// import LandingPage from "./pages/LandingPage";
import React from 'react';
// import StoreListPage from './pages/StoreListPage';
// import BookingPage from './pages/BookingPage';
import LandingPage from './pages/LandingPage';
import StoreListPage from './pages/StoreListPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/LandingPage" element={<LandingPage />}></Route>
        <Route path="/StoreListPage" element={<StoreListPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
