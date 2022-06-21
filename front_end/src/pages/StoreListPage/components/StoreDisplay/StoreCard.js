import { Card, CardContent, CardMedia, Button } from '@mui/material';
import React from 'react';
import styled from '@emotion/styled';
import AddIcon from '../../../../components/shared/AddIcon';

const StyledCard = styled(Card)`
  display: flex;
  max-width: 580px;
  padding: 15px;
  gap: 20px;
`;

const Img = styled(CardMedia)`
  max-width: 180px;
`;

const Content = styled(CardContent)`
  position: relative;
  padding: 0;
  h4 {
    margin: 0 0 8px 0;
  }
  span,
  p {
    font-size: 12px;
    color: #595959;
  }
  p {
    margin-bottom: 18px;
  }
`;

const CardButton = styled(Button)`
  font-size: 10px;
  background-color: #d18e8e;
  border-radius: 50px;
  font-weight: 600;
  position: absolute;
  bottom: 0;
  right: 0;
`;

const StoreCard = ({ item: { image, name, address, addPpl, desc, link } }) => {
  return (
    <StyledCard variant="outlined">
      <Img component="img" image={image} alt="" />
      <Content>
        <h4>{name}</h4>
        <span>{`${address} | ${addPpl}`}</span>
        <p>{desc}</p>
        <AddIcon />
        <CardButton variant="contained" href={link} size="small">
          Learn more
        </CardButton>
      </Content>
    </StyledCard>
  );
};

export default StoreCard;
