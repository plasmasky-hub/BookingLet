import React from 'react';
import BannerInputs from './BannerInputs';
import BanerForm from './BanerForm';
import CustomizedInputBase from '../SearchBar';
import styled from 'styled-components';
// import homebg from '../../../../assets/home-bg.jpg';
import bannerbg from '../../../../assets/home-banner.jpg';
// import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography, Box } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SchoolIcon from '@mui/icons-material/School';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';

// height: calc(100vh - 120px);
// min-height: 750px;
const BannerWrapper = styled.div`
  width: 100%;
  padding: 0 20px;
  height: calc(100vh - 120px);
  min-height: 750px;
  box-sizing: border-box;
  background-image: url(${bannerbg});
  background-repeat: no-repeat;
  background-size: cover;
`;

const BannerContainer = styled.div`
  margin-left: 240px;
  padding-top: 200px;
`;

const InputPanel = styled.div`
  width: 508px;
  height: 223px;
  margin-top: 35px;
  padding: 15px;
  background: rgba(217, 217, 217, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border-radius: 10px;
`;

const BannerLabel = styled.div`
  color: #ffffff;
  font-size: 32px;
  font-weight: bold;
  line-height: 37px;
  width: 374px;
  height: 76px;
`;

const BannerButton = styled(Button)({
  width: 165,
  height: 50,
  borderStyle: 'none',
  cursor: 'pointer',
  '&.MuiButton-root': {
    backgroundColor: '#D08888',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 700,
  },
});

const LandingBanner = ({ FormData, setFormData }) => (
  <BannerWrapper sx={{ position: 'relative' }}>
    <BannerContainer>
      <BannerLabel>What would you like to book today?</BannerLabel>
      <InputPanel>
        <BannerInputs />
        <CustomizedInputBase />
        <BannerButton
          variant="contained"
          disableRipple
          sx={{
            mt: 2,
          }}
        >
          SEARCH
        </BannerButton>
      </InputPanel>
    </BannerContainer>
    <Box
      sx={{
        width: 1100,
        display: 'flex',
        position: 'absolute',
        top: 'calc(100vh - 180px)',
        left: '50%',
        marginLeft: '-550px',
      }}
    >
      <Box
        sx={{
          width: 220,
          height: 140,
          background: '#D18888',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          cursor: 'pointer',
        }}
        onClick={(e) => {
          e.preventDefault();
          window.location.replace('/#Dining');
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: '4px' }}>
          <RestaurantMenuIcon sx={{ color: 'white', mr: '4px' }} />
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 22,
              color: 'white',
              lineHeight: '25px',
            }}
          >
            Dining
          </Typography>
        </Box>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: 14,
            color: 'white',
            lineHeight: '16px',
          }}
        >
          Restaurant, grocery, etc.{' '}
        </Typography>
        <KeyboardArrowDownIcon
          sx={{
            color: 'white',
            position: 'absolute',
            top: '120px',
            left: '50%',
            marginLeft: '-15px',
          }}
        />
      </Box>
      <Box
        sx={{
          width: 220,
          height: 140,
          background: '#7993AC',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          cursor: 'pointer',
        }}
        onClick={(e) => {
          e.preventDefault();
          window.location.replace('/#Entertainment');
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: '4px' }}>
          <SportsEsportsIcon sx={{ color: 'white', mr: '4px' }} />
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 22,
              color: 'white',
              lineHeight: '25px',
            }}
          >
            Entertainment
          </Typography>
        </Box>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: 14,
            color: 'white',
            lineHeight: '16px',
          }}
        >
          Gaming, karaoke, pool, etc.{' '}
        </Typography>
        <KeyboardArrowDownIcon
          sx={{
            color: 'white',
            position: 'absolute',
            top: '120px',
            left: '50%',
            marginLeft: '-15px',
          }}
        />
      </Box>
      <Box
        sx={{
          width: 220,
          height: 140,
          background: '#DF75C8',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          cursor: 'pointer',
        }}
        onClick={(e) => {
          e.preventDefault();
          window.location.replace('/#Health & Beauty');
        }}
      >
        {' '}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: '4px' }}>
          <FavoriteBorderIcon sx={{ color: 'white', mr: '4px' }} />
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 22,
              color: 'white',
              lineHeight: '25px',
            }}
          >
            Health & Beauty
          </Typography>
        </Box>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: 14,
            color: 'white',
            lineHeight: '16px',
          }}
        >
          Beauty, Nail and Spa Salon, etc{' '}
        </Typography>
        <KeyboardArrowDownIcon
          sx={{
            color: 'white',
            position: 'absolute',
            top: '120px',
            left: '50%',
            marginLeft: '-15px',
          }}
        />
      </Box>
      <Box
        sx={{
          width: 220,
          height: 140,
          background: '#9AA88F',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          cursor: 'pointer',
        }}
        onClick={(e) => {
          e.preventDefault();
          window.location.replace('/#Life Service');
        }}
      >
        {' '}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: '4px' }}>
          <SchoolIcon sx={{ color: 'white', mr: '4px' }} />
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 22,
              color: 'white',
              lineHeight: '25px',
            }}
          >
            Life Service
          </Typography>
        </Box>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: 14,
            color: 'white',
            lineHeight: '16px',
          }}
        >
          School, Childcare, Events, etc{' '}
        </Typography>
        <KeyboardArrowDownIcon
          sx={{
            color: 'white',
            position: 'absolute',
            top: '120px',
            left: '50%',
            marginLeft: '-15px',
          }}
        />
      </Box>
      <Box
        sx={{
          width: 220,
          height: 140,
          background: '#D7994D',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          cursor: 'pointer',
        }}
        onClick={(e) => {
          e.preventDefault();
          window.location.replace('/#Entertainment');
        }}
      >
        {' '}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: '4px' }}>
          <SportsSoccerIcon sx={{ color: 'white', mr: '4px' }} />
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 22,
              color: 'white',
              lineHeight: '25px',
            }}
          >
            Sports
          </Typography>
        </Box>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: 14,
            color: 'white',
            lineHeight: '16px',
          }}
        >
          Football, Golf, Cricket, etc{' '}
        </Typography>
        <KeyboardArrowDownIcon
          sx={{
            color: 'white',
            position: 'absolute',
            top: '120px',
            left: '50%',
            marginLeft: '-15px',
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
