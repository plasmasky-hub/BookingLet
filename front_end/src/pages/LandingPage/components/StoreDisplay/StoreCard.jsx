import React from 'react';
import { Card } from '@mui/material';
import AddIcon from './AddIcon';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';

const CardWrapper = styled(Card)`
  width: 258px;
  padding: 22px 18px;
  box-sizing: border-box;
  :hover {
    transform: scale(1.1);
    transition: 0.3s;
  }
`;

const ImgWrapper = styled.div`
  position: relative;
  margin-bottom: 30px;
  img {
    width: 100%;
    border-radius: 8px;
  }

  span {
    font-size: 11px;
    padding: 5px 14px;
    background-color: #7b8b6f;
    border-radius: 50px;
    color: #fff;
    position: absolute;
    bottom: -8px;
    right: 1px;
  }
`;

const StoreName = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: -5px;
`;

const Address = styled.p`
  font-size: 14px;
`;

const Label = styled.span`
  display: inline-block;
  font-size: 12px;
  padding: 5px 10px;
  background-color: #c5b8a5;
  color: white;
  border-radius: 7px;
  margin: 7px 3px 7px 0;
`;

const AddPpl = styled.p`
  font-size: 14px;
  margin-bottom: 20px;
`;

const CardButton = styled(Button)`
  color: #7b8b6f;
  font-weight: 600;
  float: right;
  padding: 0;
  font-size: 14px;
`;

const StoreCard = ({
  data: { image, avl, name, address, svList, maxPpl, addPpl },
}) => {
  console.log(maxPpl, addPpl);

  return (
    <CardWrapper>
      <ImgWrapper>
        <img src={image} alt="food" />
        <AddIcon />
        <span style={{ display: `${avl}` }}>AVAILABLE TODAY</span>
      </ImgWrapper>
      <StoreName>{name}</StoreName>
      <Address>{address}</Address>
      <Label style={{ display: `${svList}` }}>Service list available</Label>
      <Label>Max {maxPpl} ppl.</Label>
      <AddPpl>{addPpl} people add to booklet</AddPpl>
      <CardButton variant="text" href="#">
        Book Now
      </CardButton>
    </CardWrapper>
  );
};

export default StoreCard;
