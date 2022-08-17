import React from 'react';
import { Button } from '@mui/material';
import styled from '@emotion/styled';

const StyledButton = styled(Button)`
  background-color: #7b8b6f;
  color: #fff;

  font-size: 11px;
  border-radius: 10px;
  font-weight: 600;
  padding: 7px 25px 4px 25px;
`;

const ForwardButton = ({ step, setStep, Forms, setOpen, FormData }) => {
  const text = ['Find', 'Next', 'Next', 'Submit'];
  let auth = localStorage.getItem('token');
  const { service, people, duration, startTime, mobile } = FormData;
  const isFilled =
    step === 0
      ? service && people
      : step === 1
      ? duration && startTime
      : step === 2
      ? mobile
      : true;

  return step < Forms.length - 1 ? (
    <StyledButton
      onClick={() => {
        auth = localStorage.getItem('token');
        auth && isFilled && setStep(step + 1);
        (auth && isFilled) || setOpen(true);
      }}
      variant="contained"
    >
      {text[step]}
    </StyledButton>
  ) : null;
};

export default ForwardButton;
