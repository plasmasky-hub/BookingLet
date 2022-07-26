import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';

const StyledTextField = styled(TextField)`
  width: 100%;
  margin-bottom: 20px;
  & label {
    display: ${(props) => (props.showlabel ? '' : 'none')};
    color: #bababa;
  }
  & legend {
    display: ${(props) => (props.showlabel ? '' : 'none')};
  }
  .menuItem {
    font-size: 14px;
  }
`;

export default StyledTextField;
