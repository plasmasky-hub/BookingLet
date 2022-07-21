import React,{useState} from "react";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import styled from '@emotion/styled';

const AddIcon = () => {
  const [icon, setIcon] = useState(BookmarkBorderIcon);

  const ChangeIcon = () => {
    setIcon(icon === BookmarkBorderIcon ? BookmarkIcon : BookmarkBorderIcon);
  };

  const AddIcon = styled(icon)`
    color: #d18e8e;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
  `;

  return <AddIcon onClick={ChangeIcon} />;
};

export default AddIcon;