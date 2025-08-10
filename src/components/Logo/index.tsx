import { useNavigate } from "react-router-dom";
import { LogoDiv } from "./styles";

interface LogoProps {
  fontSize?: string;
  onClick?: () => void; 
}

export function Logo({ fontSize = "2.5rem", onClick }: LogoProps) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/');
    if (onClick) onClick(); 
  };
  
  return (
    <LogoDiv onClick={handleClick} fontSize={fontSize}>
      <h1>The</h1>
      <h1>Movie</h1>
      <h1>Tracker</h1>
    </LogoDiv>
  );
}