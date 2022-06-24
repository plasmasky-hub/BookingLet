import React, { useState } from 'react';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import styled from '@emotion/styled';

const AddIcon = () => {
  const [add, setAdd] = useState(false);

  const handleClick = () => {
    setAdd(!add);
  };

  const color = add ? '#D69636' : '#fff';

  const AddIcon = styled(BookmarkIcon)`
    color: ${color};
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
  `;

  return <AddIcon onClick={handleClick} />;
};

export default AddIcon;
