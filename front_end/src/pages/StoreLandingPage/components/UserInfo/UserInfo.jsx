import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import homebg from '../../../../assets/storeInfo-bg.jpeg';
import { useNavigate } from 'react-router-dom';
import bannerBg from '../../../../assets/7098.png';

const UserInfoWrapper = styled.div`
  height: 377px;
  /* width: 80vw; */
  /* background-image:url(${homebg}); */
  /* background-size: cover; */
  /* margin-top:20px; */
  border-radius: 20px;
  backdrop-filter: blur(8px);
  background-color: #ffffff7b;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  box-shadow: 5px;
`;
const UserInfoContainer = styled.div`
  width: 500px;
  padding: 60px;
`;
const UserBannerBackground = styled.div`
  background-image: url(${bannerBg});
  background-size: contain;
  background-repeat: no-repeat;
  margin: 60px 30px 0 0;
  width: 528px;
  height: 241px;
`;

const UserName = styled.div`
  font-style: normal;
  font-weight: 550;
  font-size: 25px;
  line-height: 32px;
  color: #100c57;
  padding: 20px 0;
  font-family: 'Poppins';
`;
const RegisterButton = styled.div`
  width: 240px;
  height: 40px;
  background-color: #fa8279;
  border-style: none;
  cursor: pointer;
  border-radius: 20px;
  color: aliceblue;
  font-weight: 600;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserInfo = (props) => {
  const navigate = useNavigate();

  // const user = JSON.parse( localStorage.getItem('user') );
  const name = props.userName;

  return (
    <UserInfoWrapper>
      <UserInfoContainer>
        <Avatar sx={{ width: 119, height: 119 }} src={props.data.photo} />
        <UserName>
          Hi, {name}
          <br /> Manage your stores here
        </UserName>
        <RegisterButton onClick={() => navigate(`/AddNewStore`)}>
          Register a new store
        </RegisterButton>
      </UserInfoContainer>
      <UserBannerBackground />
    </UserInfoWrapper>
  );
};

export default UserInfo;
