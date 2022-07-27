import Link from '@mui/material/Link';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// const StyledLogo = styled(Box)`
//   flex-grow: 1;
//   font-family: Helvetica, sans-serif;
//   font-size: 1.5rem;
//   font-weight: 700;
//   color: #000;
//   padding-left: 80px;
//   cursor: pointer;
// `;

export const Logo = () => {
  const navigate = useNavigate();
  return (
    <Link
      component={RouterLink}
      sx={{
        fontSize: '1.5rem',
        fontWeight: '700',
        color: '#000',
        paddingLeft: '80px',
        textDecoration: 'none',
        '&:hover,&:focus': {
          color: '#647664',
        },
      }}
      to="/"
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
        navigate('/');
      }}
    >
      Bookinglet
    </Link>
    // <StyledLogo >Bookinglet</StyledLogo>
  );
};
