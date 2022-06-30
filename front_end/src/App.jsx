// import LandingPage from "./pages/LandingPage";
import React from 'react';
// import StoreListPage from './pages/StoreListPage';
// import BookingPage from './pages/BookingPage';
import LandingPage from './pages/LandingPage';
import StoreListPage from './pages/StoreListPage';
import { UserBookingPage } from './pages/UserBookingPage/components/Header/Header';
import { BookingPage } from './pages/UserBookingPage/components/BookingPage/BookingPage';

function App() {
  return (
    // <StoreListPage />
    // <BookingPage />
    // <LandingPage />
    //     // <div>
    //     //   <div>
    //     //     <LandingPage />
    //     //   </div>
    //     // </div>
    <div>
      <UserBookingPage />
      <BookingPage />
    </div>
    
  );
}

export default App;
