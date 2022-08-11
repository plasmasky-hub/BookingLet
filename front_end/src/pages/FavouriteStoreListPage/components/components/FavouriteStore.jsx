import React from "react";
import StoreDisplay from "./components/StoreDisplay/StoreDisplay";
import styled from "@emotion/styled";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useGetFavouriteStoreByIdQuery } from "../../../../store/api/userApi";
import { useParams } from "react-router-dom";
import dinning from "../../../../assets/dining.jpeg";

const CategoryWrapper = styled.div`
  position: relative;
  margin-top: 36px;
  display: flex;
  flex-direction: column;
  background: rgba(217, 217, 217, 0.4);
`;
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled(MuiAccordionSummary)`
  text-transform: uppercase;
  background-image: url(${dinning});
  background-repeat: no-repeat;
  background-size: cover;
  height: 90px;
  font-size: 40px;
  width: 1159px;
`;
const AccordionDetails = styled(MuiAccordionDetails)`
  background: rgba(217, 217, 217);
  /* opacity: 0.4; */

  /* background-color: rgba(217, 217, 217, 0.4); */
`;

const FavouriteStore = ({ category }) => {
  // const cardData = useGetStoresQuery();
  let { _id } = useParams();
  const cardData = useGetFavouriteStoreByIdQuery(_id);

  const { data: favoriteStores, isSuccess, error } = cardData;

  const filteredStore = isSuccess
    ? favoriteStores.filter(
        (favoriteStores) => favoriteStores.rootCategories[0] === category._id
      )
    : error;

  return (
    <CategoryWrapper>
      <Accordion>
        <AccordionSummary
          id="banner1"
          aria-controls="banner1-content"
          sx={{ boxShadow: 3}}
          expandIcon={<ExpandMoreIcon fontSize="24px" sx={{ color: "#fff" }} />}
        >
          <Typography fontSize="24px" sx={{ color: "#fff" }}>
            {category.name}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            {isSuccess ? (
              <StoreDisplay favoriteStores={filteredStore} />
            ) : (
              "not ok"
            )}
          </div>
        </AccordionDetails>
      </Accordion>
    </CategoryWrapper>
  );
};

export default FavouriteStore;
