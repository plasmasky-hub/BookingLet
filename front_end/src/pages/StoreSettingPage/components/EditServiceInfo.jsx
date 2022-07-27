import { React, useState } from 'react';
import styled from '@emotion/styled';
import {
  useGetRootCategoriesQuery,
  useGetSubCategoriesQuery,
} from '../../../store/api/categoryApi';
import { Button } from '@mui/material';
import { useEditServiceInfoMutation } from '../../../store/api/serviceInfoApi';

const StyledSelect = styled.select`
  width: 140px;
  margin-left: 20px;
  padding: 5px;
`;

const StyledLabel = styled.label`
  font-size: 14px;
  input {
    margin-left: 20px;
  }
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
  const sid = '62d4d57861e1f832ded64c18';
  console.log(newService, display.serviceId);

  return (
    <form>
      <p>
        <StyledLabel>
          Service Name:
          <input
            value={Form.name}
            onChange={(e) =>
              service && setForm({ ...Form, name: e.target.value })
            }
          />
        </StyledLabel>
      </p>
      <p>
        <StyledLabel>
          Category :
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
        </StyledLabel>
      </p>
      <p>
        <StyledLabel>
          Subcategory :
          <StyledSelect
            value={Form.subCategories}
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
            value={Form.durationType}
            onChange={(e) => setForm({ ...Form, durationType: e.target.value })}
          >
            <option value="fixed">Fixed</option>
            <option value="unlimited">Unlimited</option>
            <option value="changeable">Changable</option>
          </StyledSelect>
        </StyledLabel>
      </p>
      {Form.durationType !== 'unlimited' && (
        <p>
          <StyledLabel>
            Duration:
            <input
              value={Form.minimum}
              onChange={(e) =>
                setForm({
                  ...Form,
                  minimum: e.target.value,
                })
              }
              style={{ width: '40px', marginRight: '20px' }}
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
                  style={{ width: '40px', marginRight: '20px' }}
                />
              </>
            )}
            hour(s)
          </StyledLabel>
        </p>
      )}
      <p>
        <StyledLabel>
          Person Limit:
          <input
            value={Form.maxPersonPerSection}
            onChange={(e) =>
              setForm({
                ...Form,
                maxPersonPerSection: e.target.value,
              })
            }
          />
        </StyledLabel>
      </p>
      <p>
        <StyledLabel>
          Service Quantity:
          <input
            value={Form.maxServicePerSection}
            onChange={(e) =>
              setForm({
                ...Form,
                maxServicePerSection: e.target.value,
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
            value={Form.price}
            onChange={(e) => setForm({ ...Form, price: e.target.value })}
          />
        </StyledLabel>
      </p>
      <p style={{ fontSize: '14px' }}>Description:</p>
      <textarea
        value={Form.description}
        onChange={(e) => setForm({ ...Form, description: e.target.value })}
        rows="4"
        cols="40"
        style={{ fontSize: '14px' }}
      />
      <Buttons>
        <StyledButton
          onClick={async () => {
            console.log(sid);
            await editServiceInfo({ sid, newService });
            setIsEdit(false);
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
