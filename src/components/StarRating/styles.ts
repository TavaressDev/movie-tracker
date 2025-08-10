import styled from "styled-components";

export const StarRatingContainer = styled.div`
  display: flex;
  gap: 0.2rem;
  margin-bottom: 0.5rem;
`;

export const Star = styled.span<{ $filled: boolean }>`
  color: ${props => props.$filled ? '#f5c518' : '#ccc'};
  cursor: pointer;
  font-size: 1.2rem;
`;