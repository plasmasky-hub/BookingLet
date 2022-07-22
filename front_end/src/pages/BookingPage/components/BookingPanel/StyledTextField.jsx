import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';

const StyledTextField = styled(TextField)`
  width: 100%;
  margin: 10px 0;
  & label {
    font-size: ${(props) => (props.p3 ? '' : '19px')};
    color: ${(props) => (props.p3 ? '#909090' : '#323232')};
    font-weight: ${(props) => (props.p3 ? 500 : 600)};
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
