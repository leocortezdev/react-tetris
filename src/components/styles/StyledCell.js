import styled from "styled-components";

export const StyledCell = styled.div`
  width: auto;
  background: rgba(${({color}) => color}, 0.8);
  border: ${(props) => (props.type === 0 ? "0px solid" : "4px solid")};
  border-bottom-color: rgba(${({color}) => color}, 0.1);
  border-right-color: rgba(${({color}) => color}, 1);
  border-top-color: rgba(${({color}) => color}, 1);
  border-left-color: rgba(${({color}) => color}, 0.3);
`;
