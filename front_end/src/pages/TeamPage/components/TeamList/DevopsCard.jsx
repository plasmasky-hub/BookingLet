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

export default function DevopsCard() {
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
        <MemberPhoto src="https://dynamic-assets.gather.town/sprite/avatar-SX8ipZnrlQqKLZuiYFk0-8IxYJmX9KwGUNSKpnJ5L-Thh1O95hOZKq4yyTmVQD-XLdPqjCqolRtNKGmWpmK-rSM5nOfWWQU3htWmKpQ3.png"/>
        <h4>Xinglin Chen</h4>
        <p>Provide leadership and work collaboratively with the DevOps Group, including constructing development plans and proactively looking to solve operational issues.</p>
        <ButtonIcons aria-label="Linkedin" onClick={(e) => {
        e.preventDefault();
        window.open("https://www.linkedin.com/in/xinglin-chen/", "_blank");
        }}>
            <LinkedInIcon />
        </ButtonIcons>
      </Cards>
      <Cards elevation={3}>
        <MemberPhoto src="https://dynamic-assets.gather.town/sprite/avatar-LhLl9CuAb5E94Ene8bXZ-dQCYs4n7O99ksXuBIe33-xpK3Fk6qh2MemlexMHzE-Thh1O95hOZKq4yyTmVQD-bn9I5heSHGfzKb7KyNQm-ahIsL7J203yLTh5SVo8R-8aOPqJ8Njm4zWTvM6JK1-bbRDRC2sIfc9svbGSxDY.png"/>
        <h4>Yifan Yang</h4>
        <p>Enthusiastic DevOps Engineer, eager to contribute to team success through hard work, attention to detail and excellent organizational skills.</p>
        <ButtonIcons aria-label="Linkedin" onClick={(e) => {
        e.preventDefault();
        window.open("https://www.linkedin.com/in/yifan-yang-068570162/", "_blank");
        }}>
            <LinkedInIcon />
        </ButtonIcons>
      </Cards>
      <Cards elevation={3}>
        <MemberPhoto src="https://dynamic-assets.gather.town/sprite/avatar-LhLl9CuAb5E94Ene8bXZ-dQCYs4n7O99ksXuBIe33-xpK3Fk6qh2MemlexMHzE-Thh1O95hOZKq4yyTmVQD-bn9I5heSHGfzKb7KyNQm-ahIsL7J203yLTh5SVo8R-8aOPqJ8Njm4zWTvM6JK1-bbRDRC2sIfc9svbGSxDY.png"/>
        <h4>Sonia Ni</h4>
        <p>AWS Certified Solution Architect Associate,  skilled in Linux, Jenkins, Ansible, Docker, Kubernetes, AWS, Terraform, Grafana.</p>
        <ButtonIcons aria-label="Linkedin" onClick={(e) => {
        e.preventDefault();
        window.open("https://www.linkedin.com/in/nini1108/", "_blank");
        }}>
            <LinkedInIcon />
        </ButtonIcons>
      </Cards>
      <Cards elevation={3}>
        <MemberPhoto src="https://dynamic-assets.gather.town/sprite/avatar-LhLl9CuAb5E94Ene8bXZ-dQCYs4n7O99ksXuBIe33-xpK3Fk6qh2MemlexMHzE-Thh1O95hOZKq4yyTmVQD-bn9I5heSHGfzKb7KyNQm-ahIsL7J203yLTh5SVo8R-8aOPqJ8Njm4zWTvM6JK1-bbRDRC2sIfc9svbGSxDY.png"/>
        <h4>Christina Chen</h4>
        <p>Highly motivated and adaptable DevOps Engineer who has the ability to learn fast and tailor solutions specific to the requirements of the individual project.</p>
        <ButtonIcons aria-label="Linkedin" onClick={(e) => {
        e.preventDefault();
        window.open("https://www.linkedin.com/in/christina-cloud-engineer/", "_blank");
        }}>
            <LinkedInIcon />
        </ButtonIcons>
      </Cards>
      <Cards elevation={3}>
        <MemberPhoto src="https://dynamic-assets.gather.town/sprite/avatar-LhLl9CuAb5E94Ene8bXZ-dQCYs4n7O99ksXuBIe33-xpK3Fk6qh2MemlexMHzE-Thh1O95hOZKq4yyTmVQD-bn9I5heSHGfzKb7KyNQm-ahIsL7J203yLTh5SVo8R-8aOPqJ8Njm4zWTvM6JK1-bbRDRC2sIfc9svbGSxDY.png"/>
        <h4>Andy Wang</h4>
        <p>A motivated and problem-solving DevOps engineer who has developed solid knowledge and skills AWS, CICD,IaC,monitoring.</p>
        <ButtonIcons aria-label="Linkedin" onClick={(e) => {
        e.preventDefault();
        window.open("https://www.linkedin.com/in/andy-wang-666wing", "_blank");
        }}>
            <LinkedInIcon />
        </ButtonIcons>
      </Cards>
      <Cards elevation={3}>
        <MemberPhoto src="https://dynamic-assets.gather.town/sprite/avatar-LhLl9CuAb5E94Ene8bXZ-dQCYs4n7O99ksXuBIe33-xpK3Fk6qh2MemlexMHzE-Thh1O95hOZKq4yyTmVQD-bn9I5heSHGfzKb7KyNQm-ahIsL7J203yLTh5SVo8R-8aOPqJ8Njm4zWTvM6JK1-bbRDRC2sIfc9svbGSxDY.png"/>
        <h4>Kevin Fan</h4>
        <p>A cloud engineer who has a solid understanding of DevOps tech tools and a lot of practices to deploy projects in the AWS</p>
        <ButtonIcons aria-label="Linkedin" onClick={(e) => {
        e.preventDefault();
        window.open("https://www.linkedin.com/in/xiaoyu-fan-devops/", "_blank");
        }}>
            <LinkedInIcon />
        </ButtonIcons>
      </Cards>
      
      
    </Box>
  );
}