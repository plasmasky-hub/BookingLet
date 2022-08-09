import React from 'react';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import styled from '@emotion/styled';

const AddIcon = ({ favoriteUsers }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user._id : null;

  const add = favoriteUsers && userId ? favoriteUsers.includes(userId) : false;

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
