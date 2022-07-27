import React from "react";
import LandingPage from "./pages/LandingPage";
import StoreListPage from "./pages/StoreListPage";
import BookingPage from "./pages/BookingPage";
import FavouriteStoreListPage from "./pages/FavouriteStoreListPage";
import StoreSettingPage from "./pages/StoreSettingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserBookingPage } from "./pages/UserBookingPage/UserBookingPage";
import PageLayout from "./components/shared/PageLayout";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import Layout from "./components/shared/Layout";

function App() {
  return (
    <BrowserRouter>
      <PageLayout>
        <Header />
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/LandingPage" element={<LandingPage />}></Route>
            <Route path="/StoreListPage" element={<StoreListPage />}></Route>
            <Route path="/BookingPage/:_id" element={<BookingPage />}></Route>
            <Route
              path="/UserBookingPage/"
              element={<UserBookingPage />}
            ></Route>
            <Route
              path="/FavouriteStoreListPage/:_id"
              element={<FavouriteStoreListPage />}
            ></Route>
            <Route
              path="/StoreSettingPage/:id"
              element={<StoreSettingPage />}
            ></Route>
          </Routes>
        </Layout>
        <Footer />
      </PageLayout>
    </BrowserRouter>
  );
}

export default App;
