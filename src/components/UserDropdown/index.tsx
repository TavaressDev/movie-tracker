import { useState, useRef, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import type { User } from 'firebase/auth';
import { DropdownButton, DropdownContainer, DropdownItem, DropdownMenu } from './styles';

interface UserDropdownProps {
  user: User | null;
  onLogout?: () => void; 
}

export function UserDropdown({ user, onLogout }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      if (onLogout) onLogout(); 
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };
  const handleViewProfile = () => {
    if (user?.uid) {
      navigate(`/profile/${user.uid}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton onClick={toggleDropdown}>
        <img 
          src={user?.photoURL || '/images/perfil.svg'} 
          alt="Perfil" 
          width={40} 
          height={40}
          style={{ borderRadius: '50%' }}
        />
      </DropdownButton>
      
      {isOpen && (
        <DropdownMenu>
          <div className="user-info">
            <span>{user?.displayName || 'Usuário'}</span>
            <small>{user?.email}</small>
          </div>
          <DropdownItem onClick={handleViewProfile}>
            Ver Perfil
          </DropdownItem>
          <DropdownItem onClick={handleLogout}>
            Sair
          </DropdownItem>
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
}