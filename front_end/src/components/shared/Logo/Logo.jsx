import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import logo from '../../../assets/logo.jpg';
import { useNavigate } from 'react-router-dom';

const StyledLogo = styled(Box)`
  display: flex;
  flex-grow: 1;
  font-family: Helvetica, sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #000;
  padding-left: 80px;
  cursor: pointer;
  height: 100%;
  width: 100%;
  align-items: center;

  img {
    height: 34px;
    width: 150px;
  }
`;

export const Logo = () => {
  const navigate = useNavigate();
  return (
    <StyledLogo
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
        navigate('/');
      }}
    >
      <img src={logo} alt="logo"></img>
    </StyledLogo>
  );
};

// <Link
//   component={RouterLink}
//   sx={{
//     fontSize: '1.5rem',
//     fontWeight: '700',
//     color: '#000',
//     paddingLeft: '80px',
//     textDecoration: 'none',
//     '&:hover,&:focus': {
//       color: '#647664',
//     },
//   }}
//   to="/"
//   onClick={(e) => {
//     e.preventDefault();
//     window.scrollTo(0, 0);
//     navigate('/');
//   }}
// >
//    <img src={logo} alt='logo'></img>
// </Link>
// <StyledLogo >Bookinglet</StyledLogo>
