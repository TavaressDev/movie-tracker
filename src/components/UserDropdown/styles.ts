import styled from 'styled-components';

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 1rem;
  display: flex;
  justify-content: center; 
  
  img {
    transition: transform 0.2s;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  right: 110%;
  transform: translateX(50%); 
  top: calc(100% + 10px); 
  background: white;
  min-width: 200px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  border-radius: 8px;
  z-index: 1000;
  overflow: hidden;

  @media (max-width: 768px) {
    right: 110%;
  }  
  @media (max-width: 480px) {
    right: 112%;
  }

  &::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 8px;
    border-style: solid;
    border-color: transparent transparent white transparent;
  }

  .user-info {
    padding: 1rem;
    border-bottom: 1px solid #eee;
    text-align: center; 
    
    span {
      display: block;
      font-weight: 600;
    }
    
    small {
      color: #666;
      font-size: 0.8rem;
    }
  }
`;

export const DropdownItem = styled.div`
  padding: 0.75rem 1rem;
  cursor: pointer;
  color: #333;
  transition: all 0.2s;
  text-align: center; 

  &:hover {
    background: #f5f5f5;
    color: #000;
  }

  &:last-child {
    color: #e74c3c;
    
    &:hover {
      background: #fdeaea;
    }
  }
`;