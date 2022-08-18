import React from 'react';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import notFound from '../../assets/404.svg';
import notLogin from '../../assets/7098.png';

const ErrorWrapper = styled.div`
  margin: 80px auto 40px auto;
  text-align: center;
  color: #000;
  width: 80%;
  padding: 80px;
  background: linear-gradient(
    250.42deg,
    rgba(255, 255, 255, 0.32) 0%,
    rgba(255, 255, 255, 0.08) 101.65%
  );
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  p {
    font-size: 50px;
    margin-top: 40px;
  }
`;

const StyledButton = styled(Button)`
  color: #000;
  background-color: #fff;
  border-radius: 10px;
  padding: 5px 15px;
  box-shadow: #fff 0 -1px 4px, #ff0 0 -2px 10px, #ff8000 0 -10px 20px,
    red 0 -18px 40px, 5px 5px 15px 5px rgba(0, 0, 0, 0);
`;

const ErrorHandle = () => {
  const navigate = useNavigate();
  const LoginText = useLocation().state;

  return (
    <ErrorWrapper>
      <div>
        {LoginText ? (
          <img src={notLogin} alt="Logo" style={{ width: '800px' }} />
        ) : (
          <img src={notFound} alt="Logo" style={{ width: '500px' }} />
        )}
      </div>
      <p>{LoginText || '404 - Page Not Found'}</p>
      <StyledButton onClick={() => navigate('/')}>Back To Home</StyledButton>
    </ErrorWrapper>
  );
};

export default ErrorHandle;
