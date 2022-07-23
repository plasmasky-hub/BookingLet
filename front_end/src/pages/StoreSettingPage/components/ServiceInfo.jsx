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

const ServiceInfoWrapper = styled(Paper)`
  width: 470px;
  background-color: #c1cbd7;
  padding: 60px 40px 20px 40px;
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

const StyledLabel = styled.label`
  font-size: 14px;
  input {
    margin-left: 20px;
  }
`;

const StyledSelect = styled.select`
  width: 140px;
  margin-left: 20px;
  padding: 5px;
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

  const newService = {
    name: Form.name,
    rootCategory: Form.rootCategory,
    subCategories: [Form.subCategories],
    store: Form.store,
    duration: {
      durationType: Form.durationType,
      changeableDuration: {
        minimum: Form.minimum,
        maximum: Form.maximum,
      },
    },
    maxPersonPerSection: Form.maxPersonPerSection,
    maxServicePerSection: Form.maxServicePerSection,
    price: Form.price,
    description: Form.description,
  };
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
      <form>
        <fieldset disabled={show}>
          <p>
            <StyledLabel>
              Service Name:
              <input
                value={show ? service.name : Form.name}
                onChange={(e) =>
                  service ? '' : setForm({ ...Form, name: e.target.value })
                }
              />
            </StyledLabel>
          </p>
          <p>
            <StyledLabel>
              Category :
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
            </StyledLabel>
          </p>
          <p>
            <StyledLabel>
              Subcategory :
              <StyledSelect
                value={
                  show ? service.subCategories[0].name : Form.subCategories
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
            </StyledLabel>
          </p>
          <p>
            <StyledLabel>
              Duration Type:
              <StyledSelect
                value={show ? service.duration.durationType : Form.durationType}
                onChange={(e) =>
                  setForm({ ...Form, durationType: e.target.value })
                }
              >
                <option value="fixed">Fixed</option>
                <option value="unlimited">Unlimited</option>
                <option selected value="changeable">
                  Changable
                </option>
              </StyledSelect>
            </StyledLabel>
          </p>
          <p>
            <StyledLabel>
              Changeable Duration:
              <input
                value={
                  show
                    ? service.duration.changeableDuration.minimum
                    : Form.minimum
                }
                onChange={(e) =>
                  setForm({
                    ...Form,
                    minimum: parseInt(e.target.value),
                  })
                }
                style={{ width: '40px', marginRight: '20px' }}
              />
              to
              <input
                value={
                  show
                    ? service.duration.changeableDuration.maximum
                    : Form.maximum
                }
                onChange={(e) =>
                  setForm({
                    ...Form,
                    maximum: parseInt(e.target.value),
                  })
                }
                style={{ width: '40px', marginRight: '20px' }}
              />
              hour(s)
            </StyledLabel>
          </p>
          <p>
            <StyledLabel>
              Person Limit:
              <input
                value={
                  show ? service.maxPersonPerSection : Form.maxPersonPerSection
                }
                onChange={(e) =>
                  setForm({
                    ...Form,
                    maxPersonPerSection: parseInt(e.target.value),
                  })
                }
              />
            </StyledLabel>
          </p>
          <p>
            <StyledLabel>
              Service Quantity:
              <input
                value={
                  show
                    ? service.maxServicePerSection
                    : Form.maxServicePerSection
                }
                onChange={(e) =>
                  setForm({
                    ...Form,
                    maxServicePerSection: parseInt(e.target.value),
                  })
                }
              />
            </StyledLabel>
          </p>
          <SubTitle>Optional Field</SubTitle>
          <p>
            <StyledLabel>
              price:
              <input
                value={show ? service.price : Form.price}
                onChange={(e) => setForm({ ...Form, price: e.target.value })}
              />
            </StyledLabel>
          </p>
          <p style={{ fontSize: '14px' }}>Description:</p>
          <textarea
            value={show ? service.description : Form.description}
            onChange={(e) => setForm({ ...Form, description: e.target.value })}
            rows="4"
            cols="40"
            style={{ fontSize: '14px' }}
          />
        </fieldset>
      </form>
      <Buttons>
        {show ? (
          <StyledButton style={{ padding: '5px 30px' }}>Edit</StyledButton>
        ) : (
          <StyledButton
            onClick={() => {
              addService(newService);
              setForm({ ...x });
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
    </ServiceInfoWrapper>
  );
};

export default ServiceInfo;
