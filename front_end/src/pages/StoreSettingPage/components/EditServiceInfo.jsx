import { React, useState } from 'react';
import styled from '@emotion/styled';
import {
  useGetRootCategoriesQuery,
  useGetSubCategoriesQuery,
} from '../../../store/api/categoryApi';
import { Button } from '@mui/material';
import { useEditServiceInfoMutation } from '../../../store/api/serviceInfoApi';

const GridWrapper = styled.div`
  font-size: 14px;
  display: grid;
  grid-template-columns: 35fr 65fr;
  margin-bottom: 10px;
  input {
    width: 100%;
  }
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 5px;
`;

const SubTitle = styled.p`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 15px;
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

const EditServiceInfo = ({ service, id, display, isEdit, setIsEdit }) => {
  const [editServiceInfo] = useEditServiceInfoMutation();

  const [Form, setForm] = useState({
    name: service.name,
    rootCategory: service.rootCategory.id,
    subCategories: service.subCategories[0].id,
    store: id,
    durationType: service.duration.durationType,
    minimum: service.duration.changeableDuration
      ? service.duration.changeableDuration.minimum
      : '',
    maximum: service.duration.changeableDuration
      ? service.duration.changeableDuration.maximum
      : '',
    maxPersonPerSection: service.maxPersonPerSection,
    maxServicePerSection: service.maxServicePerSection,
    price: service.price,
    description: service.description,
  });
  const { data: rootCategory, isSuccess } = useGetRootCategoriesQuery();

  const { data: subCategory, isSuccess: success } = useGetSubCategoriesQuery(
    Form.rootCategory
  );

  const duration =
    Form.durationType === 'changeable'
      ? {
          durationType: Form.durationType,
          changeableDuration: {
            minimum: parseInt(Form.minimum),
            maximum: parseInt(Form.maximum),
          },
        }
      : Form.durationType === 'fixed'
      ? { durationType: Form.durationType, fixedDuration: Form.minimum }
      : { durationType: Form.durationType };

  const newService = {
    name: Form.name,
    subCategories: [Form.subCategories],
    duration: duration,
    maxPersonPerSection: parseInt(Form.maxPersonPerSection),
    price: Form.price,
    description: Form.description,
  };
  const sid = display.serviceId;

  return (
    <form>
      <GridWrapper>
        <label>Service Name:</label>
        <input
          value={Form.name}
          onChange={(e) =>
            service && setForm({ ...Form, name: e.target.value })
          }
        />
      </GridWrapper>
      <GridWrapper>
        <label>Category :</label>
        <StyledSelect
          value={Form.rootCategory}
          onChange={(e) =>
            setForm({
              ...Form,
              rootCategory: e.target.value,
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
          value={Form.subCategories}
          onChange={(e) => setForm({ ...Form, subCategories: e.target.value })}
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
          value={Form.durationType}
          onChange={(e) => setForm({ ...Form, durationType: e.target.value })}
        >
          <option value="fixed">Fixed</option>
          <option value="unlimited">Unlimited</option>
          <option value="changeable">Changable</option>
        </StyledSelect>
      </GridWrapper>
      {Form.durationType !== 'unlimited' && (
        <GridWrapper>
          <label>Duration:</label>
          <FlexWrapper>
            <input
              value={Form.minimum}
              onChange={(e) =>
                setForm({
                  ...Form,
                  minimum: e.target.value,
                })
              }
              style={{ width: Form.durationType === 'fixed' ? '70%' : '60px' }}
            />
            {Form.durationType === 'changeable' && (
              <>
                to
                <input
                  value={
                    service.duration.durationType === 'changeable'
                      ? Form.maximum
                      : ''
                  }
                  onChange={(e) =>
                    setForm({
                      ...Form,
                      maximum: e.target.value,
                    })
                  }
                  style={{ width: '60px' }}
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
          value={Form.maxPersonPerSection}
          onChange={(e) =>
            setForm({
              ...Form,
              maxPersonPerSection: e.target.value,
            })
          }
        />
      </GridWrapper>
      <GridWrapper>
        <label>Service Quantity:</label>
        <input
          value={Form.maxServicePerSection}
          onChange={(e) =>
            setForm({
              ...Form,
              maxServicePerSection: e.target.value,
            })
          }
        />
      </GridWrapper>
      <SubTitle>Optional Field</SubTitle>
      <GridWrapper>
        <label>price:</label>
        <input
          value={Form.price}
          onChange={(e) => setForm({ ...Form, price: e.target.value })}
        />
      </GridWrapper>
      <p style={{ fontSize: '14px' }}>Description:</p>
      <textarea
        value={Form.description}
        onChange={(e) => setForm({ ...Form, description: e.target.value })}
        rows="4"
        cols="40"
        style={{ fontSize: '14px', width: '100%' }}
      />
      <Buttons>
        <StyledButton
          onClick={async () => {
            if (sid && newService) {
              await editServiceInfo({ sid, newService });
              setIsEdit(false);
            }
          }}
          style={{ padding: '5px 30px' }}
        >
          Save
        </StyledButton>
      </Buttons>
    </form>
  );
};

export default EditServiceInfo;
