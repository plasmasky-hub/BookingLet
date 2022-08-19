import { React, useState } from "react";
import AWS from 'aws-sdk';
import { nanoid } from 'nanoid'
// import styled from "styled-components";
import StoreInfText from "../StoreSettingPage/components/EditStore/components/StoreInfText/StoreInfText";
import StoreSmallText from "../StoreSettingPage/components/EditStore/components/StoreInfSmallText/StoreSmallText";
import StoreInfFilter from "../StoreSettingPage/components/EditStore/components/StoreInfFilter/StoreInfFilter";
import styled from "@emotion/styled";
import { Avatar, Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import StoreInfTextEmail from "../StoreSettingPage/components/EditStore/components/StoreInfTextEmail/StoreInfTextEmail";
import StoreInfTextTel from "../StoreSettingPage/components/EditStore/components/StoreInfTextTel/StoreInfTextTel";
import StoreInfSmallPostcode from "../StoreSettingPage/components/EditStore/components/StoreInfSmallPostcode/StoreInfSmallPostcode";
import { useNavigate } from "react-router-dom";
import { useUpdateUserMutation } from "../../store/api/userApi";
import { ToastContainer, toast } from 'react-toastify';

const StoreInfWrapper = styled.div`
  width: 1140px;
  /* width: 1233px; */
  height: 862px;
  background-color: #fbfbfb;
  margin-left: 47px;
  margin-top: 38px;
  padding-top: 10px;
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
  margin-left: 430px;
  display: flex;
  justify-content: space-around;
`;

const StoreInfName = styled.div`
  margin-left: 40px;
  margin-top: 20px;
  margin-bottom: 2px;
  font-family: "Helvetica";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 20px;
  padding-bottom: 10px;
`;

const Photo = styled.div`
  width: 130px;
  height: 130px;
  margin-left: 40px;
  margin-bottom: 40px;
  background-color: #d9d9d9;
  border-radius: 25px;
`;

const UserAvatar = styled.img`
  width: 114px;
  height: 114px;
  margin-left: 8px;
  margin-top: 8px;
  border-radius: 20px;
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
  margin-top: 60px;
  color: #397cc2;
`;

const PhotoUpload = styled.input`
  margin-left: 40px;
  margin-bottom: 10px;
  color: gray;
`;

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const albumBucketName = "jr-bookinglet-2";
const bucketRegion = "ap-southeast-2";
const IdentityPoolId = "ap-southeast-2:ff8c9fa8-c41d-47d5-904f-026c39786702";
const albumName = "user-avatar";



AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId
  })
});


const PersonalForm = ({ personaldata, id }) => {
  const [UpdateUser] = useUpdateUserMutation();
  const [Form, setForm] = useState({
    name: personaldata.name,
    tel: personaldata.tel,
    email: personaldata.email,
    city: personaldata.location.city,
    postcode: personaldata.location.postcode,
    citystate: personaldata.location.state,
    photo: personaldata.photo
  });

  const userObj = {
    location: {
      state: Form.citystate,
      city: Form.city,
      postcode: Form.postcode,
    },
    email: Form.email,
    name: Form.name,
    tel: Form.tel,
    photo: Form.photo
  };



  const navigate = useNavigate();
  //console.log(userObj, "y");
  //console.log(Form, "o");
  //console.log(id, "bbb");
  // console.log(isSuccess && personaldata.name);

  function verificationPicFile(file) {
    const fileTypes = [".jpg", ".png"];
    let filePath = file.name;
    let fileEnd = filePath.substring(filePath.indexOf("."));
    let fileSize = file.size / 1024;

    if (fileTypes.indexOf(fileEnd) < 0) {
      toast.error('Only png and jpg images are accepted!');
      return false;
    }
    if (fileSize > 150) {
      toast.error('Image must less than 150 MB!');
      return false;
    }
    return true;
  }

  return (
    <>
      (
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
      <StoreInfWrapper>
        <WholeContainer>
          <Title>My Profile</Title>
          <PhotoContainer>
            <StoreInfName>Photo</StoreInfName>
            <PhotoUpload input type="file" className="uploadPoint"></PhotoUpload>
            <Photo>
              <UserAvatar src={Form.photo}></UserAvatar>
            </Photo>
          </PhotoContainer>
          <TopContainer>
            <StoreName>Name</StoreName>
            {/* <StoreInfText defaultValue={isSuccess && data.naem}/> */}
            <StoreInfText name={Form.name} setForm={setForm} Form={Form} />
            {/* <StoreName>Last Name</StoreName>
          <StoreInfText /> */}
            <StoreName>Mobile</StoreName>
            <StoreInfTextTel tel={Form.tel} setForm={setForm} Form={Form} />
            <StoreName>E-mail</StoreName>
            <StoreInfTextEmail
              email={Form.email}
              setForm={setForm}
              Form={Form}
            />
          </TopContainer>

          <SmallTextContainer>
            <SmallTextWrapper>
              <StoreName>City</StoreName>
              <StoreSmallText city={Form.city} setForm={setForm} Form={Form} />
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
              onClick={() => navigate(`/`)}
            >
              Back
            </StoreInfButton>

            <StoreInfButton
              variant="contained"
              // onClick={() => {
              //   // UpdateUser({ id, userObj });
              //   // console.log(id, "yyy");
              //   // setForm({ ...Form });
              //   if (userObj) {
              //     let r = await UpdateUser({id, userObj });
              //     setForm({ ...Form });
              //     // await UpdateStore({newForm,id});
              //     console.log(r, "y");
              //   }
              // }}
              onClick={async () => {
                if (userObj) {
                  const awsFile = document.querySelector('.uploadPoint');

                  const addPhoto = (albumName) => {
                    let files = awsFile.files;
                    if (!files.length) {
                      return alert("Please choose a file to upload first.");
                    }
                    let file = files[0];
                    let fileName = file.name;
                    let albumPhotosKey = encodeURIComponent(albumName) + "/" + nanoid();
                    let photoKey = albumPhotosKey + fileName;

                    let upload = new AWS.S3.ManagedUpload({
                      params: {
                        Bucket: albumBucketName,
                        Key: photoKey,
                        Body: file
                      }
                    });

                    let photoURL = `https://${albumBucketName}.s3.${bucketRegion}.amazonaws.com/${photoKey}`;
                    userObj.photo = photoURL;
                    let promise = upload.promise();
                    promise.then(
                      function (data) {
                        setForm({ ...Form, photo: photoURL });
                      },
                      function (err) {
                        toast.error("There was an error uploading your photo: ", err.message);
                      }
                    );
                  }

                  if (awsFile.files[0] !== undefined) {
                    let permission = verificationPicFile(awsFile.files[0]);
                    if (permission) { addPhoto(albumName); }
                  }
                  let result = await UpdateUser({ userObj, id });

                  setForm({ ...Form });
                  if (result.data.Error !== undefined) {
                    return toast.error(result.data.Error);
                  } else {
                    return toast.success(`successfully updated`);
                  }
                  // await UpdateStore({newForm,id});
                }
              }}
            >
              Save
            </StoreInfButton>
          </ButtonContainer>
        </WholeContainer>
      </StoreInfWrapper>
      )
    </>
  );
};

export default PersonalForm;
