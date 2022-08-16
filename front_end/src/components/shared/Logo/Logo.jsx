import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import logo from '../../../assets/Logo.png';
// import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

const StyledLogo = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexGrow: '1',
  fontFamily: 'Helvetica, sans-serif',
  fontSize: '1.5rem',
  fontWeight: '700',
  color: '#000',
  cursor: 'pointer',
  height: '100%',
  alignItems: 'center',

  [theme.breakpoints.down('md')]: {
    paddingLeft: '10px',
  },
  [theme.breakpoints.up('md')]: {
    paddingLeft: '30px',
  },

  '& img': {
    [theme.breakpoints.down('md')]: {
      width: '150px',
    },
    [theme.breakpoints.up('md')]: {
      width: '250px',
    },
  }
}));

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
    //   BookingLet
    // </Link>
  );
};
