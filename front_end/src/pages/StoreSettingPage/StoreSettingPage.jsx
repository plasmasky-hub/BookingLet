import { React, useState } from 'react';
import styled from '@emotion/styled';
import Calendar from './components/Calendar';
import StoreInfo from './components/StoreInfo';
import { useGetStoreQuery } from '../../store/api/storeApi';
import { useParams } from 'react-router-dom';
import StoreSetting from './components/StoreSetting';
import ServiceInfo from './components/ServiceInfo';
import ServiceList from './components/ServiceList';

const ContentWrapper = styled.div`
  display: flex;
  margin: 100px auto;
  width: fit-content;
  box-sizing: border-box;
`;

const StoreSettingPage = () => {
  let { id } = useParams();
  const { data, isSuccess } = useGetStoreQuery(id);

  const [display, setDisplay] = useState({
    StoreCalendar: false,
    StoreInfo: true,
    StoreSetting: false,
    ServiceInfo: true,
    ServiceList: true,
    ServiceCalendar: false,
    serviceId: 0,
  });

  return (
    <>
      {isSuccess && (
        <ContentWrapper>
          {display.StoreCalendar && <Calendar id={id} />}
          {display.StoreInfo && (
            <StoreInfo store={data} display={display} setDisplay={setDisplay} />
          )}
          {display.StoreSetting && <StoreSetting />}
          {display.ServiceList && (
            <ServiceList id={id} display={display} setDisplay={setDisplay} />
          )}
          {display.ServiceInfo && (
            <ServiceInfo id={id} display={display} setDisplay={setDisplay} />
          )}
          {display.ServiceCalendar && <Calendar a="Service" />}
        </ContentWrapper>
      )}
    </>
  );
};

export default StoreSettingPage;
