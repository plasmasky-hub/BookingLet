import React from 'react';
import styled from '@emotion/styled';
import FlexWrapper from './FlexWrapper';

const Title = styled.p`
  font-size: 14px;
  text-align: left;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Step4 = ({ FormData, setFormData, FakeData }) => {
  const date = FormData.date.toDateString().substring(4);
  /*******************************************************/
  //StartTime & EndTime
  /*******************************************************/
  let startHour, startMinute;
  if (FormData.startTime) {
    startHour = FormData.startTime._d.getHours();
    startMinute = FormData.startTime._d.getMinutes();
  }
  const startTime = `${startHour}:${
    startMinute < 10 ? `0${startMinute}` : startMinute
  }`;

  const showEndTime = (hour, minute, duration) => {
    const m = minute + duration * 60;
    return m % 60 < 10
      ? `${hour + Math.floor(m / 60)}:0${m % 60}`
      : `${hour + Math.floor(m / 60)}:${m % 60}`;
  };

  const endTime = showEndTime(startHour, startMinute, FormData.duration);

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
          {startTime} - {endTime}
        </p>
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
