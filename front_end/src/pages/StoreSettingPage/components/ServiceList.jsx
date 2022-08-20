import React from 'react';
import styled from '@emotion/styled';
import { Paper } from '@mui/material';
import { useGetAllServiceInfosQuery } from '../../../store/api/serviceInfoApi';
import AddIcon from '@mui/icons-material/Add';

const ServiceListWrapper = styled(Paper)`
  width: 200px;
  background: linear-gradient(
    250.42deg,
    rgba(255, 255, 255, 0.32) 0%,
    rgba(255, 255, 255, 0.08) 101.65%
  );
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  padding: 60px 0;
  text-align: center;
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 40px;
`;

const List = styled.ul`
  list-style-type: none;
  font-size: 15px;
  margin: 0;
  padding: 0;
  li {
    background-color: #fff;
    padding: 8px 0;
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
