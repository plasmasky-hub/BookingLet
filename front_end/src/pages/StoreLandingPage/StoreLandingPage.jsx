import React from "react";
import styled from 'styled-components';
import UserInfo from "./components/UserInfo/UserInfo";
import StoreState from "./components/StoreState/StoreState";

const PageContainer = styled.div`
    margin: 0 auto;
    justify-content:center;
    display:relative;
`

const StoreLandingPage = () => {
    const user = JSON.parse( localStorage.getItem("user") ); 
    // console.log("🚀 ~ file: UserPanel.jsx ~ line 104 ~ UserPanel ~ user", user)
    // console.log(typeof(user));
    // console.log(user.name);

    const userInfo = {
        "name": user.name,
        "role": user.role,
        "id": user._id,
    }

    return (
        <PageContainer>
            <UserInfo userName={userInfo.name}/>
            <StoreState userId = {userInfo.id}/>
        </PageContainer>
    )
    
};

export default StoreLandingPage;