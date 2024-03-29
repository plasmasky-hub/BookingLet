import { React, useState } from 'react';
import styled from '@emotion/styled';
import { Paper, Button } from '@mui/material';
import {
  useGetRootCategoriesQuery,
  useGetSubCategoriesQuery,
} from '../../../store/api/categoryApi';
import {
  useGetServiceInfoQuery,
  useDeleteServiceInfoMutation,
  useAddServiceInfoMutation,
} from '../../../store/api/serviceInfoApi';
import EditServiceInfo from './EditServiceInfo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ServiceInfoWrapper = styled(Paper)`
  width: 470px;
  background-color: #c1cbd7;
  padding: 60px 50px 20px 50px;
  input,
  textarea {
    width: 100%;
    border: none;
    padding: 4px 8px;
  }
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 40px;
`;

const SubTitle = styled.p`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 15px;
`;

const GridWrapper = styled.div`
  font-size: 14px;
  display: grid;
  grid-template-columns: 35fr 65fr;
  margin-bottom: 10px;
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledSelect = styled.select`
  padding: 5px;
  border: none;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
`;

const StyledButton = styled(Button)`
  font-size: 14px;
  color: #fff;
  font-weight: 600;
  background-color: #397cc2;
`;

const ServiceInfo = ({ id, display, setDisplay }) => {
  const x = {
    name: '',
    rootCategory: '62d42f329a144d0fc58980c9',
    subCategories: '62d42f4f9a144d0fc58980cc',
    store: id,
    durationType: 'fixed',
    minimum: '',
    maximum: '',
    maxPersonPerSection: '',
    maxServicePerSection: '',
    price: '',
    description: '',
  };

  const [Form, setForm] = useState({ ...x });

  const [isEdit, setIsEdit] = useState(false);

  const duration =
    Form.durationType === 'changeable'
      ? {
          durationType: Form.durationType,
          changeableDuration: {
            minimum: Form.minimum,
            maximum: Form.maximum,
          },
        }
      : Form.durationType === 'fixed'
      ? {
          durationType: Form.durationType,
          fixedDuration: Form.minimum,
        }
      : { durationType: Form.durationType };

  let newService = {
    name: Form.name,
    rootCategory: Form.rootCategory,
    subCategories: [Form.subCategories],
    store: Form.store,
    duration: duration,
    maxPersonPerSection: Form.maxPersonPerSection,
    maxServicePerSection: Form.maxServicePerSection,
  };

  if (Form.price) newService.price = Form.price;
  if (Form.description) newService.description = Form.description;

  const isError = Object.values(newService).includes('');
  const { data: service } = useGetServiceInfoQuery(display.serviceId);

  const { data: rootCategory, isSuccess } = useGetRootCategoriesQuery();

  const show = service && display.serviceId !== 0;
  const rootCategoryId = show ? service.rootCategory.id : Form.rootCategory;

  const { data: subCategory, isSuccess: success } =
    useGetSubCategoriesQuery(rootCategoryId);

  const [addService] = useAddServiceInfoMutation();

  const [deleteService] = useDeleteServiceInfoMutation();

  return (
    <ServiceInfoWrapper>
      <Title>Service Infomation</Title>
      <SubTitle>Required Field</SubTitle>
      {isEdit || (
        <>
          <form>
            <fieldset disabled={show}>
              <GridWrapper>
                <label>Service Name:</label>
                <input
                  value={show ? service.name : Form.name}
                  onChange={(e) => setForm({ ...Form, name: e.target.value })}
                />
              </GridWrapper>

              <GridWrapper>
                <label>Category :</label>
                <StyledSelect
                  value={show ? service.rootCategory.id : Form.rootCategory}
                  onChange={(e) =>
                    setForm({
                      ...Form,
                      rootCategory: e.target.value,
                      subCategories: subCategory[0].id,
                    })
                  }
                >
                  {isSuccess &&
                    rootCategory.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.name}
                      </option>
                    ))}
                </StyledSelect>
              </GridWrapper>
              <GridWrapper>
                <label>Subcategory :</label>
                <StyledSelect
                  value={
                    show ? service.subCategories[0].id : Form.subCategories
                  }
                  onChange={(e) =>
                    setForm({ ...Form, subCategories: e.target.value })
                  }
                >
                  {success &&
                    subCategory.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.name}
                      </option>
                    ))}
                </StyledSelect>
              </GridWrapper>
              <GridWrapper>
                <label>Duration Type:</label>
                <StyledSelect
                  value={
                    show ? service.duration.durationType : Form.durationType
                  }
                  onChange={(e) =>
                    setForm({ ...Form, durationType: e.target.value })
                  }
                >
                  <option value="fixed">Fixed</option>
                  <option value="unlimited">Unlimited</option>
                  <option value="changeable">Changable</option>
                </StyledSelect>
              </GridWrapper>
              {((!show && Form.durationType !== 'unlimited') ||
                (show && service.duration.durationType !== 'unlimited')) && (
                <GridWrapper>
                  <label>Duration:</label>
                  <FlexWrapper>
                    <input
                      value={
                        show
                          ? service.duration.durationType === 'changeable'
                            ? service.duration.changeableDuration.minimum
                            : service.duration.fixedDuration
                          : Form.minimum
                      }
                      onChange={(e) =>
                        setForm({
                          ...Form,
                          minimum: e.target.value,
                        })
                      }
                      style={{
                        width:
                          (!show && Form.durationType === 'fixed') ||
                          (show && service.duration.durationType === 'fixed')
                            ? '70%'
                            : '60px',
                      }}
                      required
                      type="number"
                    />
                    {((!show && Form.durationType === 'changeable') ||
                      (show &&
                        service.duration.durationType === 'changeable')) && (
                      <>
                        to
                        <input
                          value={
                            show
                              ? service.duration.durationType === 'changeable'
                                ? service.duration.changeableDuration.maximum
                                : ''
                              : Form.maximum
                          }
                          onChange={(e) =>
                            setForm({
                              ...Form,
                              maximum: e.target.value,
                            })
                          }
                          style={{ width: '60px' }}
                          required
                          type="number"
                        />
                      </>
                    )}
                    hour(s)
                  </FlexWrapper>
                </GridWrapper>
              )}
              <GridWrapper>
                <label>Person Limit:</label>
                <input
                  value={
                    show
                      ? service.maxPersonPerSection
                      : Form.maxPersonPerSection
                  }
                  onChange={(e) =>
                    setForm({
                      ...Form,
                      maxPersonPerSection: e.target.value,
                    })
                  }
                  required
                  type="number"
                />
              </GridWrapper>
              <GridWrapper>
                <label>Service Quantity:</label>
                <input
                  value={
                    show
                      ? service.maxServicePerSection
                      : Form.maxServicePerSection
                  }
                  onChange={(e) =>
                    setForm({
                      ...Form,
                      maxServicePerSection: e.target.value,
                    })
                  }
                  type="number"
                />
              </GridWrapper>
              <SubTitle>Optional Field</SubTitle>
              <GridWrapper>
                <label>price:</label>
                <input
                  value={show ? service.price : Form.price}
                  onChange={(e) => setForm({ ...Form, price: e.target.value })}
                />
              </GridWrapper>
              <p style={{ fontSize: '14px' }}>Description:</p>
              <textarea
                value={show ? service.description : Form.description}
                onChange={(e) =>
                  setForm({ ...Form, description: e.target.value })
                }
                rows="4"
                style={{ fontSize: '14px', width: '100%' }}
              />
            </fieldset>

            <Buttons>
              {show ? (
                <StyledButton
                  onClick={() => {
                    setIsEdit(!isEdit);
                  }}
                  style={{ padding: '5px 30px' }}
                >
                  Edit
                </StyledButton>
              ) : (
                <StyledButton
                  onClick={() => {
                    isError && toast.error('Please fill in all the fields!');
                    isError || addService(newService);
                    isError || setForm({ ...x });
                  }}
                  style={{ padding: '5px 30px' }}
                >
                  Save
                </StyledButton>
              )}
              {show && (
                <StyledButton
                  onClick={() => {
                    deleteService(display.serviceId);
                    setDisplay({ ...display, serviceId: 0 });
                  }}
                  style={{ backgroundColor: '#E27777' }}
                >
                  Delete
                </StyledButton>
              )}
              {show && (
                <StyledButton
                  onClick={() =>
                    setDisplay({
                      ...display,
                      ServiceList: display.ServiceCalendar ? true : false,
                      StoreInfo: display.ServiceCalendar ? true : false,
                      ServiceCalendar: display.ServiceCalendar ? false : true,
                    })
                  }
                  style={{ backgroundColor: '#D69636' }}
                >
                  {display.ServiceCalendar ? 'Back' : 'Calendar'}
                </StyledButton>
              )}
            </Buttons>
          </form>
        </>
      )}
      {isEdit && show && (
        <EditServiceInfo
          service={service}
          id={id}
          display={display}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
      )}
      <ToastContainer
        style={{ fontSize: '16px' }}
        theme="dark"
        position="top-center"
        autoClose={7000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ServiceInfoWrapper>
  );
};

export default ServiceInfo;
