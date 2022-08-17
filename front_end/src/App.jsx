import React from "react";
import LandingPage from "./pages/LandingPage";
import StoreListPage from "./pages/StoreListPage";
import BookingPage from "./pages/BookingPage";
import FavouriteStoreListPage from "./pages/FavouriteStoreListPage";
import StoreSettingPage from "./pages/StoreSettingPage";
import StoreLandingPage from "./pages/StoreLandingPage";
import TeamPage from "./pages/TeamPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserBookingPage } from "./pages/UserBookingPage/UserBookingPage";
import PageLayout from "./components/shared/PageLayout";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import Layout from "./components/shared/Layout";
import EditStore from "./pages/StoreSettingPage/components/EditStore";
import PersonalSetting from "./pages/PersonalSetting";
import ErrorHandle from "./pages/ErrorHandlePage/ErrorHandle";
import PrivateRoutes from "./utils/PrivateRoutes";
import AddNewStore from "./pages/AddNewStore/AddNewStore";
import { StoreBookingManagement } from "./pages/StoreBookingManagement/StoreBookingManagement";

function App() {
  return (
    <BrowserRouter>
      <PageLayout>
        <Header />
        <Layout>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/StoreLandingPage" element={<StoreLandingPage />} />
              <Route path="/PersonalSetting" element={<PersonalSetting />} />
              <Route path="/UserBookingPage/" element={<UserBookingPage />} />
              <Route
                path="/FavouriteStoreListPage/:_id"
                element={<FavouriteStoreListPage />}
              />
              <Route
                path="/StoreSettingPage/:id"
                element={<StoreSettingPage />}
              />
              <Route path="/EditStore" element={<EditStore />} />
              <Route path="/AddNewStore" element={<AddNewStore />} />
            </Route>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/StoreListPage" element={<StoreListPage />}></Route>
            <Route path="/BookingPage/:_id" element={<BookingPage />}></Route>
            <Route path="/TeamPage" element={<TeamPage />}></Route>
            <Route
              path="/StoreBookingManagement/:id"
              element={<StoreBookingManagement />}
            ></Route>
            <Route path="/*" element={<ErrorHandle />}></Route>
          </Routes>
        </Layout>
        <Footer />
      </PageLayout>
    </BrowserRouter>
  );
}

export default App;
