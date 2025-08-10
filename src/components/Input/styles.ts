import styled from "styled-components";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: 'primary' | 'secondary';
  }
  
  export const InputStyled = styled.input<InputProps>`
    background-color: #D9D9D9;
    width: 100%;
    border-radius: 20px;
    padding: 0.5rem 1rem;
    border: none;
    font-size: 1rem;
    outline: none;
    transition: all 0.3s ease;
  
    &:focus {
      box-shadow: 0 0 0 2px rgba(55, 198, 243, 0.3);
    }
  
    &::placeholder {
      color: #6D6D6D;
    }
  `;