import React from "react";
import styled from "@emotion/styled";
import FavouriteStore from "./components/FavouriteStore";
import { useGetRootCategoriesQuery } from "../../../store/api/categoryApi";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 1159px;
  top:171px;
  left: 145px;

  h2 {
    
    height: 26px;
    top: 171px;
  }
 
`;

const FavouriteCategoryDisplay = () => {
  const categoryData = useGetRootCategoriesQuery();

  const {
    data: categories,
    isLoading,
    isSuccess,
    isError,
    error,
  } = categoryData;

  return (
    <Container>
      <h2>My Favourite Store List</h2>
    

      {isError && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {isSuccess && (
        <div>
          {categories.map((category) => {
            return <FavouriteStore category={category}  key={category._id} />;
          })}
        </div>
      )}
    </Container>
  );
};

export default FavouriteCategoryDisplay;
