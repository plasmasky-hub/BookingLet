import React from 'react';
import { Button } from '@mui/material';
import styled from '@emotion/styled';

const StyledButton = styled(Button)`
  background-color: #7b8b6f;
  font-size: 10px;
  border-radius: 10px;
  font-weight: 600;
  padding: 5px 25px 2px 25px;
`;

const ForwardButton = ({ step, setStep, Forms }) => {
  const text = ['Find', 'Next', 'Next', 'Submit'];

  return step < Forms.length - 1 ? (
    <StyledButton
      onClick={() => setStep(step + 1)}
      variant="contained"
      size="small"
    >
      {text[step]}
    </StyledButton>
  ) : null;
};

export default ForwardButton;
