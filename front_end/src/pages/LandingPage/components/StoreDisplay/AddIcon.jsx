import React from 'react';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import styled from '@emotion/styled';

const AddIcon = ({ favoriteUsers }) => {
  const userId = JSON.parse(localStorage.getItem('user'))._id;

  const add = favoriteUsers.includes(userId);

  // const handleClick = () => {
  //   setAdd(!add);
  // };

  const color = add ? '#D69636' : '#fff';

  const AddIcon = styled(BookmarkIcon)`
    color: ${color};
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
  `;

  return <AddIcon /*onClick={handleClick}*/ />;
};

export default AddIcon;
