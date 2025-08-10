import styled from "styled-components";
import { Input } from "../../components/Input";


export const LayoutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

export const LayoutHeader = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 1rem 0;
  margin-bottom: 2rem;
  gap: 1rem;

  @media (min-width: 769px) {
    justify-content: space-between;
    
    > :nth-child(1) { 
      margin-right: auto;
    }
    > :nth-child(3) { 
      flex: 1;
      min-width: 300px;
      max-width: 600px;
      margin: 0 1rem;
    }
    > :nth-child(4) { 
      margin-left: auto;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }
`;

export const StyledInput = styled(Input)`
  width: 100%;
  height: 50px;
  padding: 0 1rem;
  border: 2px solid #ddd;
  border-radius: 20px;
  font-size: 1rem;
  transition: all 0.3s ease;
  outline: none;

  &:focus {
    border-color: rgb(5, 7, 56);
    box-shadow: 0 0 0 2px rgba(100, 108, 255, 0.2);
  }

  &::placeholder {
    color: #999;
  }
`;

export const HeaderTop = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 769px) {
    display: none !important;
  }
`;

export const DesktopLogoWrapper = styled.div`
  @media (max-width: 768px) {
    display: none !important;
  }
`;

export const DesktopUserDropdownWrapper = styled.div`
  @media (max-width: 768px) {
    display: none !important;
  }
`;