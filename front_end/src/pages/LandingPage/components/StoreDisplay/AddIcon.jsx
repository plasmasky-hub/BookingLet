import React from 'react';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import styled from '@emotion/styled';

const AddIcon = ({ favoriteUsers }) => {
  let user = localStorage.getItem('user');
  //临时解决方案：解决问题：打开主页时，user可能是[object, Object]，此时会白屏；此方案实施后，此问题解决。
  //已知问题：错误根源在于 login/log out 模块，此方案只是把错误包裹住处理（让项目能正常运行），并没有解决根本问题。

  if (user === '[object Object]' || user === 'null') {
    user = '';
  }
  const userId = user ? JSON.parse(user)._id : null;
  const add = userId && favoriteUsers.includes(userId);
  const color = add ? '#D69636' : '#fff';

  const AddIcon = styled(BookmarkIcon)`
    color: ${color};
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
  `;

  return <AddIcon />;
};

export default AddIcon;
