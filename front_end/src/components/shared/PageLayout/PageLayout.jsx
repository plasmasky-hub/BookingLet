import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const PageLayout = styled(Box)({
  width: '100vw',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background:
              'linear-gradient(to bottom right,rgba(87, 183, 191,1), rgb(198, 214, 217))',
});

export default PageLayout;
