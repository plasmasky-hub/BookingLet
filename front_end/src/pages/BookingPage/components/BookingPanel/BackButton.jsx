import React from 'react';
import styled from '@emotion/styled';
import { Button } from '@mui/material';

const StyledButton = styled(Button)`
  background-color: #d76d6d;
  font-size: 11px;
  border-radius: 10px;
  font-weight: 600;
  padding: 7px 25px 4px 25px;
`;

const BackButton = ({ step, setStep, Forms }) => {
  return step === 0 || step === Forms.length - 1 ? null : (
    <StyledButton onClick={() => setStep(step - 1)} variant="contained">
      back
    </StyledButton>
  );
};

export default BackButton;
