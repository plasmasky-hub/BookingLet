import { React, useState } from "react";
// import styled from "styled-components";
import StoreInfText from "../StoreSetting/components/StoreInfText/StoreInfText";
import StoreSmallText from "../StoreSetting/components/StoreInfSmallText/StoreSmallText";
import StoreInfFilter from "../StoreSetting/components/StoreInfFilter/StoreInfFilter";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import StoreInfSmallPostcode from "../StoreSetting/components/StoreInfSmallPostcode/StoreInfSmallPostcode";
import Description from "./components/Description/Description";
import StoreInfTextAddress1 from "./components/StoreInfTextAddress1";
import StoreInfTextAddress2 from "./components/StoreInfTextAddress2";
import { useUpdateStoreMutation } from "../../../../store/api/storeApi";
import { Update } from "@mui/icons-material";

const StoreInfWrapper = styled.div`
  width: 1347px;
  height: 1036px;
  background-color: #fbfbfb;
  margin-left: 97px;
  margin-top: 38px;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 87px;
  padding-top: 117px;
  height: 450px;
`;

const StoreName = styled.div`
  width: 84px;
  height: 20px;
  font-family: "Helvetica";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 20px;
`;

const StoreTitle = styled.div`
  width: 384px;
  height: 20px;
  font-family: "Helvetica";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 20px;
`;

const WholeContainer = styled.div`
  padding-top: 50px;
  margin-left: 90px;
`;

const SmallTextContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-left: 75px;
  padding-top: 117px;
  width: 500px;
  height: 200px;
  margin-top: -105px;
`;

const Title = styled.div`
  position: absolute;
  width: 301px;
  height: 32px;
  margin-left: 85px;
  padding-top: 40px;
  font-family: "Helvetica";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: #000000;
`;

const SmallTextWrapper = styled.div`
  /* width: 400px; */
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const StoreInfButton = styled(Button)`
  width: 92px;
  height: 34px;
  background-color: ${(props) => (props.left ? "#D76D6D" : "#7B8B6F")};
  &:hover {
    background: ${(props) => (props.left ? "#D76D6D" : "#7B8B6F")};
  }
`;

const ButtonContainer = styled(Button)`
  width: 250px;
  margin-top: 20px;
  margin-left: 480px;
  display: flex;
  justify-content: space-around;
`;

const StoreInfName = styled.div`
  width: 210px;
  margin-left: 92px;
  margin-top: 20px;
  font-family: "Helvetica";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 20px;
  padding-bottom: 10px;
`;

const Photo = styled.div`
  width: 154px;
  height: 124px;
  margin-left: 88px;
  margin-bottom: 40px;
  background-color: #d9d9d9;
`;

const PhotoMenu = styled.div`
  width: 478px;
  height: 100px;
  margin-left: 88px;
  margin-bottom: 40px;
  background-color: #d9d9d9;
`;

const PhotoContainer = styled.div`
  width: 154px;
  height: 100px;
  margin-left: 628px;
  margin-top: 98px;
  position: absolute;
`;

const CheckboxContainer = styled(Button)`
  margin-left: 70px;
  margin-top: 30px;
  color: #397cc2;
`;

const DescriptionWrapper = styled.div`
  margin-top: 40px;
`;

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const PersonalSetting = ({ store, display, setDisplay }) => {
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const [UpdateStore] = useUpdateStoreMutation();
  // const { data, isSuccess } = useGetUserQuery(userId);

  const [Form, setForm] = useState({
    name: store.name,
    address1: store.location.street,
    address2: store.location.suburb,
    city: store.location.city,
    postcode: store.location.postcode,
    citystate: store.location.state,
    descrip: store.description,
  });

  const newForm = {
    location: {
      state: Form.citystate,
      city: Form.city,
      suburb: Form.address2,
      street: Form.address1,
      postcode: Form.postcode,
    },
    description: Form.descrip,
    name: Form.name,
    tel: "0422388787",
  };

  const id = store.id;

  console.log(store, "d");
  console.log(store.location.state);
  console.log(Form, "f");
  console.log(newForm, "g");

  return (
    <>
      {
        <StoreInfWrapper>
          <WholeContainer>
            <Title>Store Information</Title>
            <PhotoContainer>
              <StoreInfName>Photo</StoreInfName>
              <Photo />
              <StoreInfName>Photos of menu (Optional)</StoreInfName>
              <PhotoMenu />
            </PhotoContainer>
            <TopContainer>
              <StoreTitle>Store Name</StoreTitle>
              {/* <StoreInfText defaultValue={isSuccess && data.naem}/> */}
              <StoreInfText name={Form.name} setForm={setForm} Form={Form} />
              {/* <StoreName>Last Name</StoreName>
        <StoreInfText /> */}
              <StoreTitle>Address Line 1</StoreTitle>
              <StoreInfTextAddress1
                address1={Form.address1}
                setForm={setForm}
                Form={Form}
              />
              <StoreTitle>Address Line 2 （Optional）</StoreTitle>
              <StoreInfTextAddress2
                address2={Form.address2}
                setForm={setForm}
                Form={Form}
              />
            </TopContainer>

            <SmallTextContainer>
              <SmallTextWrapper>
                <StoreName>City</StoreName>
                <StoreSmallText
                  city={Form.city}
                  setForm={setForm}
                  Form={Form}
                />
              </SmallTextWrapper>
              <SmallTextWrapper>
                <StoreName>Postcode</StoreName>
                <StoreInfSmallPostcode
                  postcode={Form.postcode}
                  setForm={setForm}
                  Form={Form}
                />
              </SmallTextWrapper>
              {/* <SmallTextWrapper>
          <StoreName>State</StoreName> */}
              <StoreInfFilter
                citystate={Form.citystate}
                setForm={setForm}
                Form={Form}
              />
              {/* </SmallTextWrapper> */}
            </SmallTextContainer>

            <DescriptionWrapper>
              <StoreInfName>Description</StoreInfName>
              <Description
                descrip={Form.descrip}
                setForm={setForm}
                Form={Form}
              />
            </DescriptionWrapper>

            <CheckboxContainer>
              <Checkbox {...label} />I have read and agree to the Terms &
              Conditions of Bookinglet
              {/* <Checkbox {...label} defaultChecked />I have read and agree to the Terms
        & Conditions of Bookinglet */}
            </CheckboxContainer>
            <ButtonContainer>
              <StoreInfButton
                left
                variant="contained"
                onClick={() =>
                  setDisplay({
                    ...display,
                    StoreSetting: false,
                    StoreInfo: true,
                    ServiceList: true,
                    ServiceInfo: true,
                  })
                }
              >
                Back
              </StoreInfButton>

              <StoreInfButton
                variant="contained"
                onClick={async () => {
                  if (newForm) {
                    let r = await UpdateStore({ newForm, id });
                    // await UpdateStore({newForm,id});
                    console.log(r, "b");
                    setDisplay({
                      ...display,
                      StoreSetting: false,
                      StoreInfo: true,
                      ServiceList: true,
                      ServiceInfo: true,
                    });
                  }
                }}
              >
                Save
              </StoreInfButton>
            </ButtonContainer>
          </WholeContainer>
        </StoreInfWrapper>
      }
    </>
  );
};

export default PersonalSetting;
