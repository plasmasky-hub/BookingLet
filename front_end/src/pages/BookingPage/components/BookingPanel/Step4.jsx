import React from 'react';
import styled from '@emotion/styled';
import FlexWrapper from './FlexWrapper';

const Title = styled.h5`
  font-size: 14px;
  text-align: left;
  margin: ${(props) => (props.FirstLine ? '30px 0 0 0' : '14px 0 0 0')};
`;

const Step4 = ({ FormData, setFormData, FakeData }) => {
  const date = FormData.date.toDateString();

  return (
    <>
      <Title FirstLine>Order Information</Title>
      <FlexWrapper P4>
        <p>
          {date} - {FormData.people} people - {FormData.service}
        </p>
      </FlexWrapper>

      <Title>Time</Title>
      <FlexWrapper P4>
        <p>14:00 - 15:00</p>
      </FlexWrapper>

      <Title>Name</Title>
      <FlexWrapper P4>
        <p>{FormData.name}</p>
      </FlexWrapper>

      <Title>Mobile</Title>
      <FlexWrapper P4>
        <p>{FormData.mobile}</p>
      </FlexWrapper>

      <Title>Email</Title>
      <FlexWrapper P4>
        <p>{FormData.email}</p>
      </FlexWrapper>
    </>
  );
};

export default Step4;
