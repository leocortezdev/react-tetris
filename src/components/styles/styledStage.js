import styled from 'styled-components';

export const StyledStage = styled.div`
display: grid;
grid-template-rows: repeat(
    ${(({height}) => height)},
    calc(25vw/ ${({width}) => width})
);
grid-template-columns: repeat(${(width) => width})
`