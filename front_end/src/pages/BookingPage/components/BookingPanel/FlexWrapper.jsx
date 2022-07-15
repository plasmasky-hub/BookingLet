import styled from '@emotion/styled';

export const FlexWrapper = styled.div`
  margin-bottom: ${(props) => (props.P2 ? '8px' : '')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    font-size: 14px;
    color: ${(props) => (props.P4 ? '#a4a4a4' : '')};
  }
  .icon {
    color: #7b8b6f;
  }
`;

export default FlexWrapper;
