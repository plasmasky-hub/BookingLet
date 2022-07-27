import React from 'react';
import { Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import StoreDisplay from './components/StoreDisplay';
import LandingBanner from './components/LandingBaner';
import Register from './components/Register';
// import testimony from '../../assets/testimony.jpg';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import StoreIcon from '@mui/icons-material/Store';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { useState } from 'react';
import { useGetStoresQuery } from '../../store/api/storeApi';

const ServicesPanel = styled(Box)({
  background:
    'linear-gradient(249.64deg, rgba(187, 200, 148, 0.4) 0%, rgba(89, 96, 107, 0.352) 99.48%)',
});

const TestimonyImg = styled(Box)({
  width: 508,
  height: 345,
  backgroundImage: 'url(/assets/testimony.jpg)',
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
});

const ServiceIntroImg = styled(Box)({
  width: 525,
  height: 320,
  backgroundImage: 'url(/assets/ServiceIntro.png)',
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
});

const LandingPage = () => {
  const [FormData, setFormData] = useState({
    date: new Date(),
    category: '',
    state: '',
    search: '',
    isSearch: false,
    q: '',
  });
  const query = FormData.isSearch ? FormData.q : '';
  const { data, isSuccess } = useGetStoresQuery(query);
  return (
    <>
      <LandingBanner FormData={FormData} setFormData={setFormData} />
      {/* Section of Introduction */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: 1240,
            height: 876,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background:
              'linear-gradient(249.64deg, rgba(89, 96, 107, 0.352) 0%, rgba(187, 200, 148, 0.4) 99.48%)',
          }}
        >
          <Box
            sx={{
              width: '1100px',
              height: '660px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              mt: '40px',
              background:
                'linear-gradient(250.42deg, rgba(255, 255, 255, 0.32) 0%, rgba(255, 255, 255, 0.08) 101.65%)',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <Box sx={{ width: '330px', position: 'relative', mb: 5 }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: '64px',
                  lineHeight: '74px',
                  color: 'rgba(181, 181, 181, 0.25)',
                }}
              >
                Bookinglet
              </Typography>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: '40px',
                  lineHeight: '46px',
                  color: 'white',
                  position: 'absolute',
                  top: '36px',
                  left: '60px',
                }}
              >
                Our Services
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                width: '960px',
                height: '370px',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 4,
              }}
            >
              <Box
                sx={{
                  width: '395px',
                  height: '345px',
                  display: 'flex',
                  flexDirection: 'column',

                  justifyContent: 'space-evenly',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PersonOutlineIcon
                    sx={{ color: 'white', fontSize: '36px', ml: 1, mr: 1 }}
                  />
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: '22px',
                        lineHeight: '25px',
                        color: 'white',
                        m: '4px',
                      }}
                    >
                      Customer
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 400,
                        fontSize: '14px',
                        lineHeight: '16px',
                        color: 'white',
                        m: '4px',
                      }}
                    >
                      Easy to book your experience
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <StoreIcon
                    sx={{ color: 'white', fontSize: '36px', ml: 1, mr: 1 }}
                  />
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: '22px',
                        lineHeight: '25px',
                        color: 'white',
                        m: '4px',
                      }}
                    >
                      Business owner
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 400,
                        fontSize: '14px',
                        lineHeight: '16px',
                        color: 'white',
                        m: '4px',
                      }}
                    >
                      Available to register your business in different field
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccessTimeIcon
                    sx={{ color: 'white', fontSize: '36px', ml: 1, mr: 1 }}
                  />
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: '22px',
                        lineHeight: '25px',
                        color: 'white',
                        m: '4px',
                      }}
                    >
                      Flexible
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 400,
                        fontSize: '14px',
                        lineHeight: '16px',
                        color: 'white',
                        m: '4px',
                      }}
                    >
                      Manage available booking time with higher efficiency
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PhoneAndroidIcon
                    sx={{ color: 'white', fontSize: '36px', ml: 1, mr: 1 }}
                  />
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: '22px',
                        lineHeight: '25px',
                        color: 'white',
                        m: '4px',
                      }}
                    >
                      Accessible
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 400,
                        fontSize: '14px',
                        lineHeight: '16px',
                        color: 'white',
                        m: '4px',
                      }}
                    >
                      Complete functions for both business and customer
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <ServiceIntroImg />
            </Box>
          </Box>
        </Box>
      </Box>
      {/* Section of Testimony */}
      <Box
        sx={{
          width: '100%',
          height: 450,
          background: '#637765',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{ width: 1100, display: 'flex', justifyContent: 'space-between' }}
        >
          <Box sx={{ width: 450, mr: 4, p: 3 }}>
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: 32,
                color: 'white',
                lineHeight: '48px',
              }}
            >
              ‘Bookinglet extends our brand awareness to neighborhoods that
              wouldn't normally be exposed to us.’
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: 16,
                color: 'white',
                lineHeight: '18px',
                fontStyle: 'italic',
                pt: 1,
                pb: 1,
              }}
            >
              Yudong Song{' '}
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: 16,
                color: 'white',
                lineHeight: '18px',
              }}
            >
              Restaurant Owner, He Sheng BBQ Restaurant, Adelaide
            </Typography>
          </Box>
          <TestimonyImg />
        </Box>
      </Box>
      {/* Section of Store Categories */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <ServicesPanel sx={{ width: 1240 }}>
          {isSuccess && <StoreDisplay data={data} />}
          <Register />
        </ServicesPanel>
      </Box>
    </>
  );
};

export default LandingPage;
