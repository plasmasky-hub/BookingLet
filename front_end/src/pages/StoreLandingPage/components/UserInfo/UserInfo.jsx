import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';

const UserInfoWrapper = styled.div`
    height:377px;
    background-color: blue;
    margin-top:124px;
  

`
const UserInfoContainer = styled.div`
    width: 500px;
    padding:60px;
    align-items: flex-start;
`
const UserName = styled.div`
    font-family: 'Helvetica';
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 32px;
    color:#FFFFFF;
    padding: 20px 0;
`
const RegisterButton =styled.div`
  width: 240px;
  height:40px;
  background-color: #575757;
  border-style: none;
  cursor: pointer;
  border-radius: 10px;
  color: aliceblue;
  font-weight: 600;
  font-size: 20px;
  display:flex;
  align-items:center;
  justify-content:center;
`

const UserInfo = () =>(
    <UserInfoWrapper>
        <UserInfoContainer>
            <Avatar sx={{ width: 119, height: 119 }} />
            <UserName>Hi,name<br/> Manage your stores here</UserName>
            <RegisterButton>Register a new store</RegisterButton>
        </UserInfoContainer>
    </UserInfoWrapper>
);

export default UserInfo;