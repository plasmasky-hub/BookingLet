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
        <p>The tutor of developer team</p>
        <ButtonIcons aria-label="Linkedin" onClick={(e) => {
        e.preventDefault();
        window.open("https://www.linkedin.com/in/wang-chris/", "_blank");
        }}>
            <LinkedInIcon />
        </ButtonIcons>
      </Cards>
      <Cards elevation={3}>
        <MemberPhoto src="https://dynamic-assets.gather.town/sprite/avatar-LhLl9CuAb5E94Ene8bXZ-dQCYs4n7O99ksXuBIe33-xpK3Fk6qh2MemlexMHzE-Thh1O95hOZKq4yyTmVQD-bn9I5heSHGfzKb7KyNQm-ahIsL7J203yLTh5SVo8R-8aOPqJ8Njm4zWTvM6JK1-bbRDRC2sIfc9svbGSxDY.png"/>
        <h4>Williams</h4>
        <p>The tutor of DevOps team</p>
        <ButtonIcons aria-label="Linkedin" > 
            <LinkedInIcon />
        </ButtonIcons>
      </Cards>
      

      
    </Box>
  );
}