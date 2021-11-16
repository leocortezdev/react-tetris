import styled from "styled-components";

export const StyledNextTetrisBlock = styled.div`
  width: 100%;
  padding: 1rem;
  /* display: grid;
  gap: 1px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr); */
  .tetrisBlock {
    grid-area: 2 / 2 / 3 / 3;
    background-color: rgba(22, 22, 22, 1);
    display: grid;
    gap: 1px;
    grid-template-columns: repeat(${({ width }) => width}, 1fr);
    grid-template-rows: repeat(${({ height }) => height}, 1fr);
  }
`;

export const StyledTitle = styled.h4`
  margin: 0 0 1.5rem 0;
  color: #ddd;
  font-family: Pixel, monospace, "Courier New", Courier;
`;

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #000;
  padding: 1.5rem 1.25rem;
  border: 4px solid #333;
  border-radius: 1.25rem;
`;
