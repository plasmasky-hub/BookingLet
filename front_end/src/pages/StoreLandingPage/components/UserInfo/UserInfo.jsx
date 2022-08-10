import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import homebg from '../../../../assets/storeInfo-bg.jpeg';
import { useNavigate } from 'react-router-dom';


const UserInfoWrapper = styled.div`
    height:377px;
    /* background-image:url(${homebg}); */
    background-size: cover;
    margin-top:124px;

    border-top-left-radius: 25px;
    border-top-right-radius: 25px;

`
const UserInfoContainer = styled.div`
    width: 600px;
    padding:60px;
    align-items: flex-start;
`
const UserName = styled.div`
    font-family: 'Poppins';
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

const UserInfo = (props) =>{

    const navigate = useNavigate();

    // const user = JSON.parse( localStorage.getItem('user') );
    const name = props.userName;


    return(<UserInfoWrapper>
        <UserInfoContainer>
            <Avatar sx={{ width: 119, height: 119 }} />
            <UserName>Hi, {name}<br/> Manage your stores here</UserName>
            <RegisterButton onClick={()=>navigate(`/StoreSettingPage/62d43d784d61d2e252076471`)}>Register a new store</RegisterButton>
        </UserInfoContainer>
    </UserInfoWrapper>
    )
    
}
    


export default UserInfo;