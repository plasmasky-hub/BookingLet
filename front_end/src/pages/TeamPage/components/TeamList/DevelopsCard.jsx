import * as React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import IconButton from '@mui/material/IconButton';


const Cards = styled(Paper)`
    display: flex;
    flex-flow: column;
    align-items: center;
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
    margin: 0 5px 0 5px;
    font-size: 12px;
    color: #595959;
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    
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

export default function DevelopsCard() {
  return (
    <Box
      sx={{
        margin: 'auto',
        width: '80%',
        display: 'flex',
        flexWrap: 'wrap',
        // gap: '24px',
        justifyContent: 'center',
        
        
        '& > :not(style)': {
          m: 1,
          width: '15vw',
          height: '40vh',
        },
      }}
    >
      <Cards elevation={3}>
        <MemberPhoto src="https://dynamic-assets.gather.town/sprite/avatar-KqTqvfFl86GbTsCRv5AY-6AczIj4OgrICPerAqTzg-QspYaieLR4jBqhdChkNT-xrn5v0pOaycZlckfTult-WIYKWEKjK2r9fwixfavA.png"/>
        <h4>Lin Yan</h4>
        <p>A highly motivated and cooperative front-end developer. Participated in two project development. Experience with paid internships in commercial projects. Passionate about work and life.</p>
        <IconButton aria-label="delete">
            <LinkedInIcon />
        </IconButton>
      </Cards>
      <Cards elevation={3}>
        <MemberPhoto src="https://dynamic-assets.gather.town/sprite/avatar-R7cVd1GzcUu4CbnXHAWe-6AczIj4OgrICPerAqTzg-gIUxZVztQREQJ0jIkW81-dHBTXOFYfVnq9KMFnRwu-2ysgnD3CRBPj9QWutOVD-iweQI0VsBNV8CelW0oIG-7EyjSDVlNscTAlYLSHV1.png"/>
        <h4>Yiming (Jet) Zhang</h4>
        <p>I am a creative thinker and a patient communicator. I can relate well with people at all levels and have the flexibility to work well as part of a team.</p>
        <IconButton aria-label="delete">
            <LinkedInIcon />
        </IconButton>
      </Cards>
      <Cards elevation={3}>
        <MemberPhoto src="https://dynamic-assets.gather.town/sprite/avatar-LhLl9CuAb5E94Ene8bXZ-dQCYs4n7O99ksXuBIe33-xpK3Fk6qh2MemlexMHzE-Thh1O95hOZKq4yyTmVQD-bn9I5heSHGfzKb7KyNQm-ahIsL7J203yLTh5SVo8R-8aOPqJ8Njm4zWTvM6JK1-bbRDRC2sIfc9svbGSxDY.png"/>
        <h4>Williams</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames dignissim facilisis felis mollis pulvinar in.</p>
        <IconButton aria-label="delete">
            <LinkedInIcon />
        </IconButton>
      </Cards>
      <Cards elevation={3}>
        <MemberPhoto src="https://dynamic-assets.gather.town/sprite/avatar-LhLl9CuAb5E94Ene8bXZ-dQCYs4n7O99ksXuBIe33-xpK3Fk6qh2MemlexMHzE-Thh1O95hOZKq4yyTmVQD-bn9I5heSHGfzKb7KyNQm-ahIsL7J203yLTh5SVo8R-8aOPqJ8Njm4zWTvM6JK1-bbRDRC2sIfc9svbGSxDY.png"/>
        <h4>Williams</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames dignissim facilisis felis mollis pulvinar in.</p>
        <IconButton aria-label="delete">
            <LinkedInIcon />
        </IconButton>
      </Cards>
      <Cards elevation={3}>
        <MemberPhoto src="https://dynamic-assets.gather.town/sprite/avatar-LhLl9CuAb5E94Ene8bXZ-dQCYs4n7O99ksXuBIe33-xpK3Fk6qh2MemlexMHzE-Thh1O95hOZKq4yyTmVQD-bn9I5heSHGfzKb7KyNQm-ahIsL7J203yLTh5SVo8R-8aOPqJ8Njm4zWTvM6JK1-bbRDRC2sIfc9svbGSxDY.png"/>
        <h4>Williams</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames dignissim facilisis felis mollis pulvinar in.</p>
        <IconButton aria-label="delete">
            <LinkedInIcon />
        </IconButton>
      </Cards>
      <Cards elevation={3}>
        <MemberPhoto src="https://dynamic-assets.gather.town/sprite/avatar-LhLl9CuAb5E94Ene8bXZ-dQCYs4n7O99ksXuBIe33-xpK3Fk6qh2MemlexMHzE-Thh1O95hOZKq4yyTmVQD-bn9I5heSHGfzKb7KyNQm-ahIsL7J203yLTh5SVo8R-8aOPqJ8Njm4zWTvM6JK1-bbRDRC2sIfc9svbGSxDY.png"/>
        <h4>Williams</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames dignissim facilisis felis mollis pulvinar in.</p>
        <IconButton aria-label="delete">
            <LinkedInIcon />
        </IconButton>
      </Cards>
      <Cards elevation={3}>
        <MemberPhoto src="https://dynamic-assets.gather.town/sprite/avatar-LhLl9CuAb5E94Ene8bXZ-dQCYs4n7O99ksXuBIe33-xpK3Fk6qh2MemlexMHzE-Thh1O95hOZKq4yyTmVQD-bn9I5heSHGfzKb7KyNQm-ahIsL7J203yLTh5SVo8R-8aOPqJ8Njm4zWTvM6JK1-bbRDRC2sIfc9svbGSxDY.png"/>
        <h4>Williams</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames dignissim facilisis felis mollis pulvinar in.</p>
        <IconButton aria-label="delete">
            <LinkedInIcon />
        </IconButton>
      </Cards>

      
    </Box>
  );
}