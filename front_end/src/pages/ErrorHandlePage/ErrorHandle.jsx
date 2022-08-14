import React from 'react';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ErrorWrapper = styled.div`
  margin: 120px auto 40px auto;
  text-align: center;
  color: #fff;
  width: 80%;
  height: 400px;
  padding: 100px;
  background: linear-gradient(
    250.42deg,
    rgba(255, 255, 255, 0.32) 0%,
    rgba(255, 255, 255, 0.08) 101.65%
  );
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  p {
    font-size: 50px;
  }
`;

const StyledButton = styled(Button)`
  color: #000;
  background-color: #fff;
  border-radius: 10px;
`;

const ErrorHandle = () => {
  const navigate = useNavigate();
  return (
    <ErrorWrapper>
      <p>Page Not Found</p>
      <StyledButton onClick={() => navigate('/')}>Back To Home</StyledButton>
    </ErrorWrapper>
  );
};

export default ErrorHandle;
