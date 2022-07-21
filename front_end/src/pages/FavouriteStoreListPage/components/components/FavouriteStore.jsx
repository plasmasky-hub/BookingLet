import React from "react";
import StoreDisplay from "./components/StoreDisplay/StoreDisplay";
import styled from "@emotion/styled";
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useGetFavouriteStoreByIdQuery } from "../../../../store/api/userApi";
import { useParams } from "react-router-dom";


const CategoryWrapper = styled.div`
  position: relative;
  margin-top: 36px;
  display: flex;
  flex-direction:column;
 
`;
const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ExpandMoreIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));







const FavouriteStore = ({category}) => {
    // const cardData = useGetStoresQuery();
    let { _id } = useParams();
    const cardData =useGetFavouriteStoreByIdQuery(_id);
   

    const { data: favoriteStores,isSuccess,error} = cardData;
 
    const filteredStore = isSuccess?
    favoriteStores.filter((favoriteStores)=>favoriteStores.rootCategories[0]===category._id):error;




  return (
    
    <CategoryWrapper>
    
      <Accordion>
        <AccordionSummary
          id="banner1"
          aria-controls="banner1-content"
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>{category.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <div>
        {isSuccess?<StoreDisplay favoriteStores={filteredStore} />:"not ok"}
         {/*
       {isSuccess?<StoreDisplay favoriteStores={filteredStore} />:"not ok"}
       */} 
      
      </div>
        </AccordionDetails>
      </Accordion>
    
    </CategoryWrapper>
  );
};

export default FavouriteStore;
