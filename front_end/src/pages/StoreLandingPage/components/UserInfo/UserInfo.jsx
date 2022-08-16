import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
// import homebg from '../../../../assets/storeLandingImg.jpg';
import { useNavigate } from 'react-router-dom';


const UserInfoWrapper = styled.div`

    width: 100vw;
    /* margin-top:124px; */
    margin-left: calc(40px);

    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    padding: 20px;


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
    color:#000;
    padding: 20px 0;
    /* text-shadow: 1px 1px 1px #000; */
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
            <RegisterButton onClick={()=>navigate(`/AddNewStore`)}>Register a new store</RegisterButton>
        </UserInfoContainer>
    </UserInfoWrapper>
    )
    
}
    


export default UserInfo;