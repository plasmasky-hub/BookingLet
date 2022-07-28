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
        <ButtonIcons aria-label="Linkedin" onClick={(e) => {
        e.preventDefault();
        window.open("https://www.linkedin.com/in/harry-lin-unsw", "_blank");
        }}>
            <LinkedInIcon />
        </ButtonIcons>
      </Cards>
      <Cards elevation={3}>
        <MemberPhoto src="https://dynamic-assets.gather.town/sprite/avatar-R7cVd1GzcUu4CbnXHAWe-6AczIj4OgrICPerAqTzg-gIUxZVztQREQJ0jIkW81-dHBTXOFYfVnq9KMFnRwu-2ysgnD3CRBPj9QWutOVD-iweQI0VsBNV8CelW0oIG-7EyjSDVlNscTAlYLSHV1.png"/>
        <h4>Yiming (Jet) Zhang</h4>
        <p>I am a creative thinker and a patient communicator. I can relate well with people at all levels and have the flexibility to work well as part of a team.</p>
        <ButtonIcons aria-label="Linkedin" onClick={(e) => {
        e.preventDefault();
        window.open("http://linkedin.com/in/jet-zhang", "_blank");
        }}>
            <LinkedInIcon />
        </ButtonIcons>
      </Cards>
      <Cards elevation={3}>
        <MemberPhoto src="https://dynamic-assets.gather.town/sprite/avatar-nRvqvyBALMUfDJ036LY1-6h5i5rSddDE7WlHvuC0s-8hCSfYIK6RvpToNgMJNB-Lx0Zpepm3KMUYFYvdNJ1-DAW8N71PAC2NID2Gv0CZ-NXp3Do6bK0IEtN2wzPkY-MTObvArFAWBkntXPLllC-JatX3m7gnzX3abVz3p2I-R735EZLUSIEtjLumGQeb-jy8aCP1DM60k7xqtfID3-lYDlTGyapcGUrhB7e9Oe-Wuw26EcIEQ0QwF4U4fLr-udXpjQpRpeIzOYZ1Tq1W.png"/>
        <h4>Derek Zhu</h4>
        <p>Full-stack developer living in Tasmania. Contributed to both back-end development and calendar components of Bookinglet.</p>
        <ButtonIcons aria-label="Linkedin" onClick={(e) => {
        e.preventDefault();
        window.open("https://www.linkedin.com/in/derek-z-987714246/", "_blank");
        }}>
            <LinkedInIcon />
        </ButtonIcons>
      </Cards>
      <Cards elevation={3}>
        <MemberPhoto src="https://dynamic-assets.gather.town/sprite/avatar-nleRmaVuDp43pW3GYO3T-dI6m4h1Fbg6fflrj0GVT-C0ykfrlDx7AkQsLyLcNS-z3y0nUr4eDNKtW90WqEl-Thh1O95hOZKq4yyTmVQD-rUJFkqJ4QbY7F4iKtOMG-zPtbvV9Dm9Jx9jpWsnjv-fs2Udegytxxdo9Po7S05.png"/>
        <h4>Seven Wang</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fames dignissim facilisis felis mollis pulvinar in.</p>
        <ButtonIcons aria-label="Linkedin" onClick={(e) => {
        e.preventDefault();
        window.open("https://www.linkedin.com/in/longcan-wang/", "_blank");
        }}>
            <LinkedInIcon />
        </ButtonIcons>
      </Cards>
      <Cards elevation={3}>
        <MemberPhoto src="https://dynamic-assets.gather.town/sprite/avatar-TOVkkp8ZQ693ky3pycp9-9w2GtCjVHacRKmmhy2A3-9m3qVgHfBsdmFN5EuagD-8IxYJmX9KwGUNSKpnJ5L-DAW8N71PAC2NID2Gv0CZ-ZwcI0elqMoYcW0Dn84wQ-JatX3m7gnzX3abVz3p2I-JZbDG08J6CBcUBVvcnYB-1FOs3w50IlYAjOPJzodH-Rd3VWEdzGalSScXWH4Aa.png"/>
        <h4>Anita Liu</h4>
        <p>A business graduate with technical skills. Dashing web developer with professional skill set.</p>
        <ButtonIcons aria-label="Linkedin" onClick={(e) => {
        e.preventDefault();
        window.open("https://www.linkedin.com/in/anita-liu-dev/", "_blank");
        }}>
            <LinkedInIcon />
        </ButtonIcons>
      </Cards>
      <Cards elevation={3}>
        <MemberPhoto src="https://dynamic-assets.gather.town/sprite/avatar-LhLl9CuAb5E94Ene8bXZ-dQCYs4n7O99ksXuBIe33-xpK3Fk6qh2MemlexMHzE-Thh1O95hOZKq4yyTmVQD-bn9I5heSHGfzKb7KyNQm-ahIsL7J203yLTh5SVo8R-8aOPqJ8Njm4zWTvM6JK1-bbRDRC2sIfc9svbGSxDY.png"/>
        <h4>Xiaoman Li</h4>
        <p>A computer science graduate with the background of product design. Also did the UI design work for the project. Passionate about creative work. </p>
        <ButtonIcons aria-label="Linkedin" onClick={(e) => {
        e.preventDefault();
        window.open("https://www.linkedin.com/in/andy-xiaoman-li", "_blank");
        }}>
            <LinkedInIcon />
        </ButtonIcons>
      </Cards>
      <Cards elevation={3}>
        <MemberPhoto src="https://dynamic-assets.gather.town/sprite/avatar-I6CWPycmHoQX5YQhN7gt-C0ykfrlDx7AkQsLyLcNS-8IxYJmX9KwGUNSKpnJ5L-Thh1O95hOZKq4yyTmVQD-P5xxrLs0ZSa2YyUAjVrU-uKIf6cH0JRwz4dFK9sdu-4zyNlAoOhotO89n6QzR0.png"/>
        <h4>Yiyuan Tang</h4>
        <p>Results-driven computer science student from the University of Adelaide passionate about full-stack development.</p>
        <ButtonIcons aria-label="Linkedin" onClick={(e) => {
        e.preventDefault();
        window.open("https://www.linkedin.com/in/yiyuantang", "_blank");
        }}>
            <LinkedInIcon />
        </ButtonIcons>
      </Cards>
      <Cards elevation={3}>
        <MemberPhoto src="https://dynamic-assets.gather.town/sprite/avatar-R7cVd1GzcUu4CbnXHAWe-6AczIj4OgrICPerAqTzg-Thh1O95hOZKq4yyTmVQD-vipDjSLZKo9rMBRSYbYi-3r6ujTPeAl1QKF0LLqhz-RxWA2xY8YhE8HmYuWfZl-xdYxHMjEtNxGTS25ddif.png"/>
        <h4>Xiang Ji</h4>
        <p>Graduated from the University of Adelaide with 2 years of experience in coding. Have strong interests in full-stack and network security.</p>
        <ButtonIcons aria-label="Linkedin" onClick={(e) => {
        e.preventDefault();
        window.open("https://www.linkedin.com/in/shawn-xiang-ji", "_blank");
        }}>
            <LinkedInIcon />
        </ButtonIcons>
      </Cards>
      

      
    </Box>
  );
}