import styled from "styled-components";

export const DetailsContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  color: #333;
`;

export const PosterWrapper = styled.div`
  flex: 0 0 200px;
  position: relative;
  z-index: 1;


`;



export const BannerInfo = styled.div`
  flex: 1;
  z-index: 1;
  color: white;

  @media (max-width: 768px) {
    display: none;
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

export const HorizontalBanner = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-end;
  padding: 2rem;
  background: linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%);
  margin-bottom: 2rem;
  position: relative;
  min-height: 300px;
  border-radius: 8px;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-size: cover;
    background-position: center;
    z-index: -1;
    filter: brightness(0.7);
  }

  @media (max-width: 480px) {

    padding: 0;
    min-height: 150px;
    background: none;
    
    &::before {
      filter: brightness(1);
    }
  }
`;
export const PosterImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

export const BannerTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 480px) {
    display: none;
  }
`;

export const BannerDetails = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
  }
`;

export const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin: 1.5rem 0;
  color: #333;
`;
export const GenresContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    justify-content: center;
  }
`;

export const GenreTag = styled.span`
  background-color: #3a3a3a;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  color: white;
`;

export const Description = styled.p`
  margin: 1.5rem 0;
  line-height: 1.6;
  color: #555;
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin: 2rem 0 1rem;
  color: #f5c518;
`;

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;

  span {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
  }

  small {
    color: #666;
  }
`;

export const TrailerContainer = styled.div`
  margin: 2rem 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  position: relative;
  padding-bottom: 56.25%; 
  height: 0;
  
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`;

export const SeasonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

interface SeasonItemProps {
  $isSelected: boolean;
}

export const SeasonItem = styled.div<SeasonItemProps>`
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: ${props => props.$isSelected ? '#f5c518' : '#2a2a2a'};
  color: ${props => props.$isSelected ? '#000' : '#fff'};
  font-weight: ${props => props.$isSelected ? 'bold' : 'normal'};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.$isSelected ? '#f5c518' : '#3a3a3a'};
  }
`;

export const EpisodesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

export const EpisodeItem = styled.div`
  display: flex;
  gap: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 1rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e9e9e9;
  }

  .episode-number {
    font-size: 1.2rem;
    font-weight: bold;
    color: #f5c518;
    min-width: 30px;
  }

  .episode-info {
    flex: 1;

    h3 {
      margin: 0 0 0.5rem 0;
      font-size: 1.1rem;
      color: #333;
    }

    p {
      margin: 0.5rem 0 0 0;
      color: #666;
      font-size: 0.9rem;
    }

    img {
      width: 100%;
      max-width: 200px;
      border-radius: 4px;
      margin-top: 0.5rem;
    }
  }
`;

export const CommentsSection = styled.div`
  margin-top: 3rem;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  max-width: 100%; 
  box-sizing: border-box; 
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;
export const CommentsTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
`;

export const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const CommentTextarea = styled.textarea`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 100px;
  font-family: inherit;
  resize: vertical;
  width: 100%;
  box-sizing: border-box;
  max-width: 100%;
  
  @media (max-width: 480px) {
    min-height: 80px;
  }
`;

export const CommentButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: #f5c518;
  color: #000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  align-self: flex-start;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e0b416;
  }
`;

export const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const CommentItem = styled.div`
  padding: 1.5rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden; 
  word-break: break-word;
`;

export const CommentAuthor = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: inline-flex;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;
  }
  
  &:hover {
    color: #f5c518;
    text-decoration: underline;
  }
`;
export const CommentText = styled.p`
  margin: 0;
  color: #333;
  word-wrap: break-word;  
  overflow-wrap: break-word;
  white-space: pre-wrap;
  max-width: 100%; 
`;
export const RatingErrorMessage = styled.span`
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  display: block;
`;