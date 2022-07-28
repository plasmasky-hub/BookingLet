import React from "react";
import styled from 'styled-components';
import UserInfo from "./components/UserInfo/UserInfo";
import StoreState from "./components/StoreState/StoreState";

const PageContainer = styled.div`
    margin: 0 auto;
    justify-content:center;
`

const StoreLandingPage = () =>(
    <div>
        <PageContainer>
            <UserInfo />
            <StoreState />
        </PageContainer>
    </div>
);

export default StoreLandingPage;