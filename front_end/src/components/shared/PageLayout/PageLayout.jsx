import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import  BgImage  from '../../../assets/WechatIMG832.png';

const PageLayout = styled(Box)({
  width: '100vw',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  // background:'linear-gradient( to top left , #cefaff, #b8b7fd, #f56fbbbb );',
  // background:'linear-gradient( to top left , #cefaff, #b8b7fd, #f56fbbbb )',
  backgroundImage: `url(${BgImage})`,

});

export default PageLayout;
