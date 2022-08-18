import * as React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import IconButton from '@mui/material/IconButton';

const ButtonIcons = styled(IconButton)`

    align-self: flex-end;
`
const Cards = styled(Paper)`
    position: relative;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: flex;
    padding-left: 15px;
    padding-right: 15px;
    
    h4 {
    font-size: 15px;
    margin: 15px 0 15px 0;
    font-weight:700;
    font-family: Arial, Helvetica, sans-serif;
    }
    span,
    p {
    
    font-size: 12px;
    color: #595959;
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    margin-bottom: auto;
    }
`

const MemberPhoto = styled.div`
    margin-top: 12%;
    width: 90px;
    height: 90px;
    border: 2px solid #85B7AB;
    border-radius: 50%;
    background-image: url(${({src})=>src});
    background-color: #000000;
    background-repeat: no-repeat;
    background-size: 1120%;
    background-position: 5.3%;
`

export default function MemberCard() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        
        '& > :not(style)': {
          m: 1,
          width: '15vw',
          height: '40vh',
        },
      }}
    >
      <Cards elevation={3}>
        <MemberPhoto src="https://dynamic-assets.gather.town/sprite/avatar-SX8ipZnrlQqKLZuiYFk0-8IxYJmX9KwGUNSKpnJ5L-Thh1O95hOZKq4yyTmVQD-XLdPqjCqolRtNKGmWpmK-rSM5nOfWWQU3htWmKpQ3.png"/>
        <h4>Kris Wang</h4>

        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames dignissim facilisis felis mollis pulvinar in.</p>
        <ButtonIcons aria-label="delete" onClick={(e) => {
        e.preventDefault();
        window.open("https://www.linkedin.com/in/wang-chris/", "_blank");
        }}>
            <LinkedInIcon />
        </ButtonIcons>
      </Cards>
      <Cards elevation={3}>

        <MemberPhoto src="https://dynamic-assets.gather.town/sprite/avatar-34wOTOTmZwrSSdJiEz9a-egQLKXLotk1sj0mfi8TT-xpK3Fk6qh2MemlexMHzE-ZIA5n2ePmWz4l7uuafpJ-GyCB3foS6YVP5hp5Ielg-hRsijtRoprWAPgUxsBUf-WFeUuPCcj9VzwdjMhlVn-FEm6qlm5S1IZM9zIfE1h.png"/>
        <h4>Williams</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames dignissim facilisis felis mollis pulvinar in.</p>
        <ButtonIcons aria-label="delete">

            <LinkedInIcon />
        </ButtonIcons>
      </Cards>
      

      
    </Box>
  );
}