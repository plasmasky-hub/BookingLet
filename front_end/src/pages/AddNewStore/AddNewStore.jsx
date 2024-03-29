import { React, useState } from "react";
// import styled from "styled-components";
import StoreInfText from "../StoreSettingPage/components/EditStore/components/StoreInfText/StoreInfText";
import StoreSmallText from "../StoreSettingPage/components/EditStore/components/StoreInfSmallText/StoreSmallText";
import StoreInfFilter from "../StoreSettingPage/components/EditStore/components/StoreInfFilter/StoreInfFilter";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import StoreInfSmallPostcode from "../StoreSettingPage/components/EditStore/components/StoreInfSmallPostcode/StoreInfSmallPostcode";
import Description from "../StoreSettingPage/components/EditStore/components/Description/Description";
import StoreInfTextAddress1 from "../StoreSettingPage/components/EditStore/components/StoreInfTextAddress1";
import StoreInfTextAddress2 from "../StoreSettingPage/components/EditStore/components/StoreInfTextAddress2";
import { ToastContainer, toast } from "react-toastify";
import { useAddStoreMutation } from "../../store/api/storeApi";
import { useNavigate } from "react-router-dom";

const StoreInfWrapper = styled.div`
  /* width: 1347px;
  height: 1036px; */
  width: 1140px;
  height: 775.5px;
  /* height: 725.5px; */
  background-color: #fbfbfb;
  /* margin-left: 27px; */
  /* margin-left: 97px; */
  margin-top: 58px;
  margin-left: 52px;
  border-radius: 10px;
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
  padding-top: 10px;
  margin-left: 13px;
`;

const SmallTextContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-left: 75px;
  padding-top: 97px;
  width: 500px;
  height: 200px;
  margin-top: -85px;
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
  width: 398px;
  /* width: 478px; */
  height: 100px;
  margin-left: 88px;
  margin-bottom: 40px;
  background-color: #d9d9d9;
`;

const PhotoContainer = styled.div`
  width: 154px;
  height: 100px;
  /* margin-top: 38px;
  margin-left: 628px; */
  margin-left: 518px;
  margin-top: 110px;
  position: absolute;
`;

const CheckboxContainer = styled(Button)`
  margin-left: 70px;
  margin-top: 20px;
  color: #397cc2;
`;

const DescriptionWrapper = styled.div`
  margin-top: -10px;
`;

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const AddNewStore = ({ store, display, setDisplay }) => {
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const [addStore] = useAddStoreMutation();
  // const { data, isSuccess } = useGetUserQuery(userId);

  const [Form, setForm] = useState({
    name: "",
    address1: "",
    address2: "",
    city: "",
    postcode: "",
    citystate: "",
    descrip: "",
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
    owner: "62e33d84e15ae94ec1dced42",
    rootCategories: ["62d42f329a144d0fc58980c9"],
  };
  const navigate = useNavigate();

  // const id = store.id;

  // console.log(store, 'd');
  // console.log(store.location.state);
  console.log(Form, "oo");
  console.log(newForm, "p");

  return (
    <>
      <ToastContainer
        style={{ fontSize: "16px" }}
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
      {
        <StoreInfWrapper>
          <WholeContainer>
            <Title>Store Information</Title>
            <PhotoContainer>
              {/* <StoreInfName>Photo</StoreInfName>
              <Photo /> */}
              <StoreInfName>Photos of menu (Optional)</StoreInfName>
              <PhotoMenu />
              <DescriptionWrapper>
                <StoreInfName>Description</StoreInfName>
                <Description
                  descrip={Form.descrip}
                  setForm={setForm}
                  Form={Form}
                />
              </DescriptionWrapper>
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
                onClick={() => navigate(`/StoreLandingPage`)}
              >
                Back
              </StoreInfButton>

              <StoreInfButton
                variant="contained"
                onClick={async () => {
                  if (newForm) {
                    let r = await addStore(newForm);
                    setForm({ ...Form });
                    return toast.success(`successfully updated`);
                    // await UpdateStore({newForm,id});
                    // console.log(r, "b");
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

export default AddNewStore;
