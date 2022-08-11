import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
// const Layout = styled.div`
//   background-color: #ececea;
//   font-family: Helvetica;
//   padding: 10px 0;
//   box-sizing: border-box;
// `;

const Layout = styled(Box)({
  width: '1240px',
  backdropFilter: 'blur(100px)',
  // background:
    // 'linear-gradient(249.64deg, #57b6bf 100%, #D7F6F6 99.48%, #d5f2f2db, #c6d6d90)',
    // background:'linear-gradient( to top left , #cefaff, #b8b7fd, #f56fbbbb )',
    // background:'linear-gradient( to top left , #cefaff, #b8b7fd, #f56fbbbb )',

});

export default Layout;
