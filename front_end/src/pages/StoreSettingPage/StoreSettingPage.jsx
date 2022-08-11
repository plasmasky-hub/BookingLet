import { React, useState } from 'react';
import styled from '@emotion/styled';
import Calendar from './components/Calendar';
import StoreInfo from './components/StoreInfo';
import { useGetStoreQuery } from '../../store/api/storeApi';
import { useParams } from 'react-router-dom';
import StoreSetting from './components/StoreSetting';
import ServiceInfo from './components/ServiceInfo';
import ServiceList from './components/ServiceList';
import ServiceCalendar from './components/ServiceCalendar';

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
          {display.ServiceList && (
            <ServiceList id={id} display={display} setDisplay={setDisplay} />
          )}
          {display.ServiceInfo && (
            <ServiceInfo id={id} display={display} setDisplay={setDisplay} />
          )}
          {display.StoreInfo && (
            <StoreInfo store={data} display={display} setDisplay={setDisplay} />
          )}
          {display.ServiceCalendar && (
            <ServiceCalendar id={display.serviceId} storeId={id} />
          )}
          {display.StoreCalendar && <Calendar id={id} />}
          {display.StoreSetting && <StoreSetting />}
        </ContentWrapper>
      )}
    </>
  );
};

export default StoreSettingPage;
