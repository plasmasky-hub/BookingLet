import styled from "styled-components";
import Box from '@mui/material/Box';

const StyledLogo = styled(Box)`
    flex-grow: 1;
    font-family: Helvetica, sans-serif;
    font-size: 2rem;
    font-weight: 700;
    padding: 5px;
    color: #000;
    cursor: pointer;
`;

export const Logo = () => {
  return(
    <Logo>Bookinglet</Logo>
  )
}

