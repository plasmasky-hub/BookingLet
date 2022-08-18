import React from 'react';
import styled from '@emotion/styled';
import FlexWrapper from './FlexWrapper';

const Title = styled.p`
  font-size: 14px;
  text-align: left;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Step4 = ({ FormData }) => {
  const date = FormData.date.toDateString().substring(4);
  const userEmail = JSON.parse(localStorage.getItem('user')).email;
  const userName = JSON.parse(localStorage.getItem('user')).name;

  return (
    <>
      <Title>Order Information</Title>
      <FlexWrapper P4>
        <p>
          {date} - {FormData.people} people - {FormData.service.name}
        </p>
      </FlexWrapper>

      <Title>Time</Title>
      <FlexWrapper P4>
        <p>
          {FormData.startTimeStr} - {FormData.endTime}
        </p>
      </FlexWrapper>

      <Title>Name</Title>
      <FlexWrapper P4>
        <p>{userName}</p>
      </FlexWrapper>

      <Title>Mobile</Title>
      <FlexWrapper P4>
        <p>{FormData.mobile}</p>
      </FlexWrapper>

      <Title>Email</Title>
      <FlexWrapper P4>
        <p>{userEmail}</p>
      </FlexWrapper>
    </>
  );
};

export default Step4;
