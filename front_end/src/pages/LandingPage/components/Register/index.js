import React from "react";
import styled from "styled-components";
import pp from "../../../../assets/p.jpg";
import "./register.css";

const RegisterWrapper = styled.div`
  height: 355px;
  width: 634px;
  padding: 0 20px;
  max-height: 650px;
  box-sizing: border-box;
  /* background-color: yellow; */
  margin-top: 100px;
  margin: 0 auto;
  background-image: url(${pp});
  background-repeat: no-repeat;
  margin-bottom: 30px;
`;
const RegisterFont = styled.div`
  display: absolute;
  color: rgb(24, 26, 31);
  font-family: museo-bold, "Helvetica Neue", Helvetica, Arial, "Lucida Grande",
    sans-serif;
  font-size: 24px;
  font-weight: bold;
  line-height: 32px;
  letter-spacing: -0.15px;
  width: 288px;
  height: 46px;
  padding-top: 50px;
  margin-left: 40px;
`;

const Button = styled.div`
  display: relative;
  width: 152px;
  height: 51px;
  margin-top: 160px;
  margin-left: calc(50% - 80px);
  background-color: rgb(110, 24, 38);
  border-style: none;
  cursor: pointer;
  border-radius: 10px;
  color: aliceblue;
  font-weight: 600;
  font-size: 20px;
`;

const Register = () => (
  <RegisterWrapper>
    <RegisterFont>
      Register your business in Bookinglet to customize yourbooking service?
    </RegisterFont>
    <button className="registerButton" onClick={() => {}}>
      Join Now
    </button>
  </RegisterWrapper>
);

export default Register;
