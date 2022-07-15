import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import styled from '@emotion/styled';
import { MenuItem } from '@mui/material';
import StyledTextField from './StyledTextField';
import FlexWrapper from './FlexWrapper';

const Title = styled.h5`
  font-size: 14px;
  text-align: left;
  margin: ${(props) => (props.FirstLine ? '30px 0 0 0' : '25px 0 0 0')};
`;

const Step2 = ({ FormData, setFormData, FakeData }) => {
  const date = FormData.date.toDateString();
  return (
    <>
      <Title FirstLine>Order Information</Title>
      <FlexWrapper P2>
        <p>
          {date} - {FormData.people} people - {FormData.service}
        </p>
        <CheckIcon className="icon" />
      </FlexWrapper>

      <StyledTextField
        select
        label="Duration"
        value={FormData.duration}
        onChange={(event) => {
          setFormData({ ...FormData, duration: event.target.value });
        }}
        variant="standard"
      >
        {FakeData.PeopleOptions.map((option) => (
          <MenuItem key={option} value={option} className="menuItem">
            {option} hour
          </MenuItem>
        ))}
      </StyledTextField>
      <Title>Choose your time </Title>
      <h2>Not designed yet</h2>
    </>
  );
};

export default Step2;
