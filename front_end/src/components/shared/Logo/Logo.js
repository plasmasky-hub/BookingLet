import styled from "styled-components";
import Box from '@mui/material/Box';

const StyledLogo = styled(Box)`
    flex-grow: 1;
    font-family: Helvetica, sans-serif;
    font-size: 2rem;
    font-weight: 700;
    color: #000;
    padding-left: 50px;
    cursor: pointer;
`;

export const Logo = () => {
  return (
    <StyledLogo>Bookinglet</StyledLogo>
  )
}

