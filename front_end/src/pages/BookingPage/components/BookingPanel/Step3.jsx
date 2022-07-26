import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import styled from '@emotion/styled';
import StyledTextField from './StyledTextField';
import FlexWrapper from './FlexWrapper';
import Checkbox from '@mui/material/Checkbox';
const Title = styled.p`
  font-size: 14px;
  text-align: left;
  font-weight: 600;
  margin-bottom: 10px;
`;

const CheckboxWrapper = styled(FlexWrapper)`
  text-align: left;
  p {
    padding-top: 15px;
  }
`;
const Step3 = ({ FormData, setFormData }) => {
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
  const endTime =
    startHour && FormData.duration && FormData.duration !== 'unlimited'
      ? showEndTime(startHour, startMinute, FormData.duration)
      : '';

  return (
    <>
      <Title FirstLine>Order Information</Title>
      <FlexWrapper>
        <p>
          {date} - {FormData.people} people - {FormData.service.name}
        </p>
        <CheckIcon className="icon" />
      </FlexWrapper>

      <Title>Time</Title>
      <FlexWrapper>
        <p>
          {startTime} - {endTime}
        </p>
        <CheckIcon className="icon" />
      </FlexWrapper>
      <Title Input>Mobile</Title>
      <StyledTextField
        value={FormData.mobile}
        onChange={(event) => {
          setFormData({
            ...FormData,
            mobile: event.target.value,
            startTimeStr: startTime,
            endTime: endTime,
          });
        }}
        variant="outlined"
        size="small"
        showlabel="true"
        label="Please enter your number"
      />
      <Title Input>Note</Title>
      <StyledTextField
        value={FormData.note}
        onChange={(event) => {
          setFormData({ ...FormData, note: event.target.value });
        }}
        variant="outlined"
        multiline
        rows={4}
        size="small"
        showlabel="true"
        label="Add any additional note for your order"
      />
      <CheckboxWrapper>
        <Checkbox
          checked={FormData.send}
          size="small"
          onChange={() => {
            setFormData({ ...FormData, send: !FormData.send });
          }}
        />
        <p>Please send me the email once the order is confirmed.</p>
      </CheckboxWrapper>
    </>
  );
};

export default Step3;
