import React from "react";
import styled from 'styled-components';
import { Header } from "../../components/shared/Header/Header";
import Footer from"../../components/shared/Footer/Footer";
import UserInfo from "./components/UserInfo/UserInfo";
import StoreState from "./components/StoreState/StoreState";
import Layout from "../../components/shared/Layout";

const PageContainer = styled.div`
    width: 100vw;
    margin: 0 auto;
    justify-content:center;
`

const StoreLandingPage = () =>(
    <Layout >
        <Header />
        <PageContainer>
            <UserInfo />
            <StoreState />
        </PageContainer>
        <Footer />
    </Layout>
);

export default StoreLandingPage;