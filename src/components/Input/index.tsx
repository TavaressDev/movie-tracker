import { InputStyled } from "./styles"


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: 'primary' | 'secondary';
  }
export function Input({ ...props }: InputProps) {
    return <InputStyled {...props} />;
  }