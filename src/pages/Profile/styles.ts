import styled from "styled-components";

export const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: #333;
`;

export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #eee;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;


export const UserInfo = styled.div`
  flex: 1;

  h1 {
    font-size: 2rem;
    margin: 0 0 0.5rem 0;
    color: #222;
  }

  p {
    margin: 0.5rem 0;
    color: #666;
    line-height: 1.5;
  }
`;

export const ReviewsList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 2rem;
`;

export const ReviewItem = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .media-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;

    img {
      width: 60px;
      height: 90px;
      object-fit: cover;
      border-radius: 4px;
    }

    h3 {
      margin: 0;
      font-size: 1.1rem;
      color: #222;
    }
  }

  p {
    margin: 1rem 0;
    color: #444;
    line-height: 1.5;
  }

  small {
    display: block;
    color: #888;
    font-size: 0.8rem;
    text-align: right;
  }
`;

export const EmptyReviews = styled.div`
  text-align: center;
  padding: 3rem;
  background: #f9f9f9;
  border-radius: 8px;
  color: #666;

  svg {
    font-size: 3rem;
    color: #ddd;
    margin-bottom: 1rem;
  }

  p {
    margin: 0.5rem 0;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin: 2rem 0 1rem;
  color: #f5c518;
  position: relative;
  padding-bottom: 0.5rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background: #f5c518;
  }
`;

export const StatsContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin: 1.5rem 0;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const StatItem = styled.div`
  text-align: center;
  padding: 1rem;
  background: #f8f8f8;
  border-radius: 8px;
  flex: 1;

  h3 {
    margin: 0;
    font-size: 2rem;
    color: #f5c518;
  }

  p {
    margin: 0.5rem 0 0;
    color: #666;
    font-size: 0.9rem;
  }
`;