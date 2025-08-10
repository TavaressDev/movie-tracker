import styled from "styled-components";

export const LoginContainer = styled.form`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  min-height: 100vh; 
  width: 100%;  
  gap: 30px;
  padding-top: 5rem;
`;

export const LoginInputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 400px; 
  padding: 0 1rem; 

  @media (max-width: 480px) {
    max-width: 320px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 400px;
  padding: 0 1rem;

  button {
    background-color: #37C6F3;
    border: none;
    padding: 0.8rem;
    width: 100%;
    border-radius: 20px;
    color: #FFFFFF;
    font-size: 1.2rem;
    font-weight: 700;
    cursor: pointer;
    
    &:hover {
      background-color: #1EB8E5;
    }
  }

  p {
    color: #6D6D6D;
    font-size: 0.9375rem;
    cursor: pointer;
    text-align: center;

    span {
      font-weight: bold;
    }

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 480px) {
    max-width: 320px;
  }
`;