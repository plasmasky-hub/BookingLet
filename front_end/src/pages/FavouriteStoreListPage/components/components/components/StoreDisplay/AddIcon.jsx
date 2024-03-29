import React,{useState} from "react";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import styled from '@emotion/styled';
import { useAddOrCancelFavoriteStoreMutation } from "../../../../../../store/api/userApi";

const AddIcon = ({userId, _id, favoriteUsers}) => {

  const [AddOrCancelFavoriteStore] = useAddOrCancelFavoriteStoreMutation();
  const [icon, setIcon] = useState(
    favoriteUsers.includes(userId)? BookmarkIcon :BookmarkBorderIcon
  );

  const ChangeIcon = () => {
    setIcon(icon === BookmarkBorderIcon ? BookmarkIcon : BookmarkBorderIcon);
    AddOrCancelFavoriteStore({userId , _id})
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