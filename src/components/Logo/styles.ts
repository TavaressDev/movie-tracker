import styled from "styled-components";

interface LogoDivProps {
  fontSize?: string;
}

export const LogoDiv = styled.div<LogoDivProps>`
    font-size: ${(props) => props.fontSize || "2.5rem"};
    font-weight: 900;
    cursor: pointer;
    display: inline-block; 
    transition: transform 0.3s ease; 

    &:hover {
        transform: scale(1.05); 
    }
`;