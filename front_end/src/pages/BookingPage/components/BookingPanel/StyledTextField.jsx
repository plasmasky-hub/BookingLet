import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';

const StyledTextField = styled(TextField)`
  width: 100%;
  margin: ${(props) => (props.P1 ? '10px 0' : '')};
  & label {
    font-size: 19px;
    color: #323232;
    font-weight: 600;
  }
  .MuiInput-input {
    font-size: 14px;
    text-align: left;
    margin-top: 5px;
  }
  .menuItem {
    font-size: 14px;
  }
`;

export default StyledTextField;
