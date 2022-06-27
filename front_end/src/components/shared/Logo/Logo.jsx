import styled from '@emotion/styled';
import Box from '@mui/material/Box';

const StyledLogo = styled(Box)`
    flex-grow: 1;
    font-family: Helvetica, sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: #000;
    padding-left: 80px;
    cursor: pointer;
`;

export const Logo = () => {
  return (
    <StyledLogo>Bookinglet</StyledLogo>
  )
}

