import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import styled from '@emotion/styled';

const CheckIcon = styled(CheckCircleIcon)`
  font-size: 70px;
  color: #7b8b6f;
  margin-top: 10px;
`;

const Title = styled.h5`
  font-size: 15px;
  text-align: left;
  margin: 5px 0 30px 0;
  text-align: center;
`;

const Text = styled.div`
  text-align: left;
  font-size: 14px;
  width: 90%;
  margin: 50px auto 90px auto;
  letter-spacing: 0.3px;
  line-height: 18px;
`;

const Link = styled.a`
  cursor: pointer;
  color: #7b8b6f;
  font-weight: 600;
`;
const Step5 = () => {
  return (
    <>
      <CheckIcon />
      <Title>Your requset has been sent successfully </Title>
      <Text>
        Congratulations. Your booking request has been sent to the business
        owner. The status of your booking could be checked in{' '}
        <Link href="#">My booking</Link>.
      </Text>
    </>
  );
};

export default Step5;
