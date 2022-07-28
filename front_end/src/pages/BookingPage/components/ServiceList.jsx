import React from 'react';
import styled from '@emotion/styled';
import { Paper } from '@mui/material';
import dining from '../../../assets/dining.jpeg';
import { useGetAllServiceInfosQuery } from '../../../store/api/serviceInfoApi';

const ServiceListWrapper = styled(Paper)`
  width: 1180px;
  margin-top: 60px;
  box-sizing: border-box;
  border-radius: 0 0 10px 10px;
`;

const ListHeader = styled.div`
  height: 209px;
  background-image: url(${dining});
  background-size: cover;
  display: flex;
  align-items: center;
  p {
    padding-left: 50px;
    font-size: 24px;
    color: white;
    font-weight: 600;
    margin: 0;
  }
`;

const ListContent = styled.div`
  padding: 20px 60px;
`;

const ListGrid = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 0.5fr 1fr;
  p {
    font-weight: ${(props) => props.font};
    font-size: 14px;
  }
`;

const ServiceList = ({ id }) => {
  const { data: services, isSuccess } = useGetAllServiceInfosQuery(id);

  return (
    <ServiceListWrapper>
      <ListHeader>
        <p>Want to Know more about the service?</p>
      </ListHeader>
      <ListContent>
        <ListGrid font="600">
          <p>Service</p>
          <p>Price</p>
          <p>Detail</p>
        </ListGrid>
        <hr style={{ marginBottom: '30px' }} />
        {isSuccess
          ? services.map((e) => {
              return (
                <ListGrid key={e.id}>
                  <p>{e.name}</p>
                  <p>{e.price}</p>
                  <p>{e.description}</p>
                </ListGrid>
              );
            })
          : null}
      </ListContent>
    </ServiceListWrapper>
  );
};

export default ServiceList;
