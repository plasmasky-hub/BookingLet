import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { Header } from "../../components/shared/Header/Header";
import Footer from "../../components/shared/Footer";
import FavouriteCategoryDisplay from "./components/FavouriteCategoryDisplay";

const FavouriteStoreListPage = () => {
  return (
    <Layout>
      <Header />
      <FavouriteCategoryDisplay />

      <Footer />
    </Layout>
  );
};

export default FavouriteStoreListPage;
