import React from 'react';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import styled from '@emotion/styled';

const AddIcon = ({ favoriteUsers }) => {
  const user = localStorage.getItem('user');
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
