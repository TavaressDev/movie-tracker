import { Outlet } from "react-router-dom";
import { Logo } from "../../components/Logo";
import { 
  LayoutContainer, 
  LayoutHeader, 
  StyledInput, 
  HeaderTop,
  DesktopLogoWrapper,
  DesktopUserDropdownWrapper
} from "./styles";
import { UserDropdown } from "../../components/UserDropdown";
import { useAuth } from "../../hooks/useAuth";

interface DefaultLayoutProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  selectedMediaType: 'movies' | 'series';
}

export function DefaultLayout({ searchValue, onSearchChange, selectedMediaType }: DefaultLayoutProps) {
  const { user } = useAuth();

  const handleLogoClick = () => {
    onSearchChange(''); 
  };

  return (
    <LayoutContainer>
      <LayoutHeader>
        <DesktopLogoWrapper>
          <Logo fontSize="1rem" onClick={handleLogoClick} />
        </DesktopLogoWrapper>
        
        <HeaderTop>
          <Logo fontSize="1rem" onClick={handleLogoClick} />
          <UserDropdown user={user} onLogout={() => onSearchChange('')} />        

        </HeaderTop>

        <StyledInput 
          placeholder={selectedMediaType === 'movies' ? "Pesquisar filmes..." : "Pesquisar séries..."}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        
        <DesktopUserDropdownWrapper>
          <UserDropdown user={user} onLogout={() => onSearchChange('')} />  
        </DesktopUserDropdownWrapper>
      </LayoutHeader>
      <main>
        <Outlet />
      </main>
    </LayoutContainer>
  );
}