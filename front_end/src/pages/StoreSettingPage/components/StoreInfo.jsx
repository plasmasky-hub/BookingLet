import React from 'react';
import styled from '@emotion/styled';
import { Paper, Button } from '@mui/material';

const StoreInfoWrapper = styled(Paper)`
  width: 470px;
  background-color: #fbfbfb;
  padding: 60px 40px;
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 40px;
`;

const SubTitle = styled.p`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 15px;
`;

const Content = styled.p`
  font-size: 14px;
  color: #848383;
  margin-bottom: 30px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 70px;
`;

const StyledButton = styled(Button)`
  font-size: 14px;
  color: #fff;
  font-weight: 600;
`;

const StoreInfo = ({
  store: { name, location, rootCategories, description },
  display,
  setDisplay,
}) => {
  const address = `${location.street}, ${location.suburb}, ${location.city}, ${location.state} ${location.postcode}`;

  return (
    <StoreInfoWrapper>
      <Title>Store Infomation</Title>
      <SubTitle>Store Name</SubTitle>
      <Content>{name}</Content>
      <SubTitle>Address</SubTitle>
      <Content>{address}</Content>
      <SubTitle>Category</SubTitle>
      <Content>{rootCategories[0].name}</Content>
      <SubTitle>Description</SubTitle>
      <Content>{description}</Content>
      <Buttons>
        <StyledButton
          onClick={() =>
            setDisplay({
              ...display,
              EditStore: true,
              StoreInfo: false,
              ServiceList: false,
              ServiceInfo: false,
            })
          }
          style={{ backgroundColor: '#397CC2', padding: '0 30px' }}
        >
          Edit
        </StyledButton>
        <StyledButton
          onClick={() =>
            setDisplay({
              ...display,
              StoreCalendar: display.StoreCalendar ? false : true,
              ServiceList: display.StoreCalendar ? true : false,
              ServiceInfo: display.StoreCalendar ? true : false,
            })
          }
          style={{ backgroundColor: '#D69636' }}
        >
          {display.StoreCalendar ? 'Back' : 'Calendar'}
        </StyledButton>
      </Buttons>
    </StoreInfoWrapper>
  );
};
export default StoreInfo;
