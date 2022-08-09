import React from 'react';
import styled from '@emotion/styled';
import { Paper } from '@mui/material';
import { useGetAllServiceInfosQuery } from '../../../store/api/serviceInfoApi';
import AddIcon from '@mui/icons-material/Add';

const ServiceListWrapper = styled(Paper)`
  width: 200px;
  background-color: #d9d9d9;
  padding: 60px 0;
  text-align: center;
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 40px;
  color: #397cc2;
`;

const List = styled.ul`
  list-style-type: none;
  font-size: 15px;
  margin: 0;
  padding: 0;
  li {
    background-color: #f0f0f0;
    padding: 10px 20px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    gap: 5px;
    margin-bottom: 3px;
  }
`;

const ServiceList = ({ id, display, setDisplay }) => {
  const { data, isSuccess } = useGetAllServiceInfosQuery(id);

  const services = isSuccess && [...data, { name: 'Add new service', id: 0 }];

  const listItems =
    isSuccess &&
    services.map((e) => (
      <li
        key={e.id}
        onClick={() => {
          setDisplay({ ...display, serviceId: e.id });
        }}
        style={{
          backgroundColor: e.id === display.serviceId && '#397CC2',
          color: e.id === display.serviceId && '#fff',
        }}
      >
        {e.id === 0 && <AddIcon fontSize="small" />}
        {e.name}
      </li>
    ));

  return (
    <ServiceListWrapper>
      <Title>Service List</Title>
      <List>{listItems}</List>
    </ServiceListWrapper>
  );
};

export default ServiceList;
