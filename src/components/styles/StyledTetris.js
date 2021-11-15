import styled from "styled-components";

// image import

export const StyledTetrisWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  max-width: 850px;
  outline: none;
  font-size: ${({nPlayers}) => 1 - nPlayers * 0.1}rem;
`;

export const StyledTetrisArea = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  padding: 2.5rem 1rem;
  margin: 0 auto;
  min-width: 600px;
  /* font-size: 0.8rem; */
  .stage {
    width: 40%;
  }
  .next-tetrisBlock {
    width: 10vw;
    height: 10vh;
    padding-right: 1.25rem;
    > * {
      margin-bottom: 1rem;
    }
  }
  .information {
    width: 30%;
    display: block;
    padding: 0 1.25rem;
  }
`;
