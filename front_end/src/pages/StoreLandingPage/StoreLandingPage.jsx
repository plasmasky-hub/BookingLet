import React from "react";
import styled from 'styled-components';
import UserInfo from "./components/UserInfo/UserInfo";
import StoreState from "./components/StoreState/StoreState";
// import bubbles from "../../assets/WechatIMG827.png"
import homebg from '../../assets/storeLandingImg.jpg';
import { Box } from '@mui/material';

const PageContainer = styled.div`
    /* margin: auto; */
    display: flex;
    justify-content:center;
    align-items: center;
    /* background:'linear-gradient( to top left , #cefaff, #b8b7fd, #f56fbbbb )', */
    /* background-image: url(${homebg}); */
    
    background-size: contain;
    background-repeat: no-repeat;
    /* background-color: #ffffff50; */
    /* backdrop-filter: blur(8px);  */
    padding: 25px;

`

const GlassPad = styled(Box)( ({theme}) => ({
    marginTop:'100px',

    justifyContent: 'center',
    width: '1240px',
    // borderRadius: '20px',
    // backdropFilter: 'blur(8px)',
    // backgroundColor: '#ffffff7b',
    // boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',

}));

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
            <GlassPad>
                <UserInfo userName={userInfo.name}/>
                <StoreState userId = {userInfo.id}/>
            </GlassPad>
        </PageContainer>
    )
    
};

export default StoreLandingPage;