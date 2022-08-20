import React from "react";
import BanerForm from "./BanerForm";
import styled from "styled-components";
// import homebg from '../../../../assets/home-bg.jpg';
import bannerbg from '../../../../assets/home-banner.jpg';
import calendar from '../../../../assets/calendar.png';
// import Stack from '@mui/material/Stack';
import { Typography, Box } from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SchoolIcon from "@mui/icons-material/School";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

// height: calc(100vh - 120px);
// min-height: 750px;
const BannerWrapper = styled.div`
  width: 100vw;
  margin-left: calc((1240px - 100vw) / 2);
  padding: 0 20px;
  height: calc(100vh - 120px);
  min-height: 750px;
  box-sizing: border-box;
  background-image: url(${bannerbg}); 
  background-size: cover;
  /* background: linear-gradient(to bottom right,rgba(87, 183, 191,1), rgb(198, 214, 217)) ; */
  display:flex;
`;

// const CalendarBackground = styled.div`
//   /* background-image: url(${calendar}); */
//   width:70%;
//   height:70%;
//   background-repeat: no-repeat;
//   background-size: contain;
//   position:absolute;
//   right:8%;
//   top:10%;
//   z-index:3;
// `

const BannerContainer = styled.div`
  margin-left: 350px;
  padding-top: 200px;
  z-index:5;
`;

const BannerLabel = styled(Box)`
  color: #ffffff;
  font-size: 32px;
  font-weight: bold;
  line-height: 37px;
  width: 374px;
  height: 76px;
`;

const LandingBanner = ({ FormData, setFormData }) => (
  <BannerWrapper sx={{ position: "relative" }}>
    <BannerContainer>
      <BannerLabel>What would you like to book today?</BannerLabel>
      <BanerForm FormData={FormData} setFormData={setFormData} />
    </BannerContainer>

    {/* <CalendarBackground /> */}
    <Box
      sx={{
       
        width: 1100,
        display: "flex",
        position: "absolute",
        top: "calc(100vh - 180px)",
        left: "50vw",
        marginLeft: "-560px",
       
      }}
    >
      <Box
        sx={{
          width: 220,
          height: 140,
          background: "#E56050",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          cursor: "pointer",
          "&:hover": {
            height: 150,
          },
          ":last-child": {
            marginBottom: "auto",
          },
        }}
        onClick={(e) => {
          e.preventDefault();
          window.location.replace("/#Dining");
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: "4px" }}>
          <RestaurantMenuIcon sx={{ color: "white", mr: "4px" }} />
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 22,
              color: "white",
              lineHeight: "25px",
            }}
          >
            Dining
          </Typography>
        </Box>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: 14,
            color: "white",
            lineHeight: "16px",
          }}
        >
          Restaurant, grocery, etc.{" "}
        </Typography>
        <KeyboardArrowDownIcon
          sx={{
            color: "white",
            position: "absolute",
            top: "120px",
            left: "50%",
            marginLeft: "-15px",
          }}
        />
      </Box>
      <Box
        sx={{
          width: 220,
          height: 140,
          background: "#F99746",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          cursor: "pointer",
          "&:hover": {
            height: 150,
          },
        }}
        onClick={(e) => {
          e.preventDefault();
          window.location.replace("/#Entertainment");
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: "4px" }}>
          <SportsEsportsIcon sx={{ color: "white", mr: "4px" }} />
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 22,
              color: "white",
              lineHeight: "25px",
            }}
          >
            Entertainment
          </Typography>
        </Box>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: 14,
            color: "white",
            lineHeight: "16px",
          }}
        >
          Gaming, karaoke, pool, etc.{" "}
        </Typography>
        <KeyboardArrowDownIcon
          sx={{
            color: "white",
            position: "absolute",
            top: "120px",
            left: "50%",
            marginLeft: "-15px",
          }}
        />
      </Box>
      <Box
        sx={{
          width: 220,
          height: 140,

          background: "#77b867",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          cursor: "pointer",
          "&:hover": {
            height: 150,
          },
        }}
        onClick={(e) => {
          e.preventDefault();
          window.location.replace("/#Health & Beauty");
        }}
      >
        {" "}
        <Box sx={{ display: "flex", alignItems: "center", mb: "4px" }}>
          <FavoriteBorderIcon sx={{ color: "white", mr: "4px" }} />
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 22,
              color: "white",
              lineHeight: "25px",
            }}
          >
            Health & Beauty
          </Typography>
        </Box>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: 14,
            color: "white",
            lineHeight: "16px",
          }}
        >
          Beauty, Nail and Spa Salon, etc{" "}
        </Typography>
        <KeyboardArrowDownIcon
          sx={{
            color: "white",
            position: "absolute",
            top: "120px",
            left: "50%",
            marginLeft: "-15px",
          }}
        />
      </Box>
      <Box
        sx={{
          width: 220,
          height: 140,

          background: "#58BFD6",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          cursor: "pointer",
          "&:hover": {
            height: 150,
          },
        }}
        onClick={(e) => {
          e.preventDefault();
          window.location.replace("/#Life Service");
        }}
      >
        {" "}
        <Box sx={{ display: "flex", alignItems: "center", mb: "4px" }}>
          <SchoolIcon sx={{ color: "white", mr: "4px" }} />
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 22,
              color: "white",
              lineHeight: "25px",
            }}
          >
            Life Service
          </Typography>
        </Box>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: 14,
            color: "white",
            lineHeight: "16px",
          }}
        >
          School, Childcare, Events, etc{" "}
        </Typography>
        <KeyboardArrowDownIcon
          sx={{
            color: "white",
            position: "absolute",
            top: "120px",
            left: "50%",
            marginLeft: "-15px",
          }}
        />
      </Box>
      <Box
        sx={{
          width: 220,
          height: 140,
          background: "#7F70DB",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          cursor: "pointer",
          "&:hover": {
            height: 150,
          },
        }}
        onClick={(e) => {
          e.preventDefault();
          window.location.replace("/#Sports");
        }}
      >
        {" "}
        <Box sx={{ display: "flex", alignItems: "center", mb: "4px" }}>
          <SportsSoccerIcon sx={{ color: "white", mr: "4px" }} />
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 22,
              color: "white",
              lineHeight: "25px",
            }}
          >
            Sports
          </Typography>
        </Box>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: 14,
            color: "white",
            lineHeight: "16px",
          }}
        >
          Football, Golf, Cricket, etc{" "}
        </Typography>
        <KeyboardArrowDownIcon
          sx={{
            color: "white",
            position: "absolute",
            top: "120px",
            left: "50%",
            marginLeft: "-15px",
          }}
        />
      </Box>
    </Box>

    {/* <LabelHomePage>What would you like to book today?</LabelHomePage>
    </BannerContainer>
    <BanerForm FormData={FormData} setFormData={setFormData} /> */}
  </BannerWrapper>
);

export default LandingBanner;
