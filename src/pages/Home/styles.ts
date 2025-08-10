import styled from "styled-components";

export const OptionsContainer = styled.div`
  display: flex;
  gap: 2rem;
  padding: 1rem 0;
  margin-bottom: 2rem;
`;

export const OptionItem = styled.h1<{ $isSelected: boolean }>`
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: ${({ $isSelected }) => $isSelected ? '700' : '400'};
  color: ${({ $isSelected }) => $isSelected ? '#000000' : '#666666'};
  transition: all 0.2s ease;
  margin: 0;
  padding: 0.5rem 0;

  &:hover {
    color: #000000;
  }
`;


export const MediaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.5rem;
  padding: 1rem 0;
  justify-items: center; 

  @media (max-width: 480px) {
    grid-template-columns: 1fr; 
    max-width: 300px; 
    margin: 0 auto; 
  }
`;

export const MediaCard = styled.div<{ $isMobile?: boolean }>`
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
  width: 100%;
  max-width: ${({ $isMobile }) => $isMobile ? '100%' : '200px'};

  @media (max-width: 480px) {
    max-width: 100%;
  }

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: ${({ $isMobile }) => $isMobile ? 'auto' : '300px'};
    aspect-ratio: ${({ $isMobile }) => $isMobile ? '16/9' : '2/3'};
    object-fit: cover;
  }

  .placeholder {
    width: 100%;
    height: ${({ $isMobile }) => $isMobile ? '180px' : '300px'};
    background: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
  }

  h3 {
    padding: 0.75rem;
    margin: 0;
    font-size: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    
    @media (max-width: 480px) {
      white-space: normal;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }

  span {
    display: block;
    padding: 0 0.75rem 0.75rem;
    color: #666;
    font-weight: bold;
  }
`;

export const StyledInput = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: 300px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #646cff;
    box-shadow: 0 0 0 2px rgba(100, 108, 255, 0.2);
  }
`;

export const LoadMoreButton = styled.button`
  display: block;
  margin: 2rem auto;
  padding: 0.75rem 1.5rem;
  background: #646cff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #535bf2;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export const GenreFilterContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin: 1rem 0;
  padding: 0 1rem;
`;

export const GenreButton = styled.button<{ $isActive: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: none;
  background-color: ${({ $isActive }) => $isActive ? '#f5c518' : '#e0e0e0'};
  cursor: pointer;
  font-weight: ${({ $isActive }) => $isActive ? 'bold' : 'normal'};
  transition: all 0.2s ease;
  font-size: 0.9rem;

  &:hover {
    background-color: ${({ $isActive }) => $isActive ? '#e0b416' : '#d0d0d0'};
  }
`;

export const FilterTypeContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  padding: 0 1rem;
`;

export const TypeButton = styled.button<{ $isActive: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: none;
  background-color: ${({ $isActive }) => $isActive ? '#f5c518' : '#e0e0e0'};
  color: ${({ $isActive }) => $isActive ? '#000' : '#333'};
  cursor: pointer;
  font-weight: ${({ $isActive }) => $isActive ? 'bold' : 'normal'};
  transition: all 0.2s ease;
  font-size: 0.9rem;

  &:hover {
    background-color: ${({ $isActive }) => $isActive ? '#e0b416' : '#d0d0d0'};
  }
`;