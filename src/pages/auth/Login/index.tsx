import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { Input } from "../../../components/Input";
import { Logo } from "../../../components/Logo";
import { ButtonContainer, LoginContainer, LoginInputsContainer } from "./styles";
import { auth } from "../../../firebaseConfig";
import { toast } from "react-toastify";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); 
      toast.success("Login feito com sucesso!")
    } catch (error) {
      setError("Falha no login. Verifique seu e-mail e senha.");
      console.error(error);
    }
  };

  return (
    <LoginContainer onSubmit={handleSubmit}>
      <Logo />
      <LoginInputsContainer>
        <Input 
          type="email" 
          placeholder="E-mail" 
          aria-label="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input 
          type="password" 
          placeholder="Senha" 
          aria-label="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </LoginInputsContainer>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ButtonContainer>
        <button type="submit">Entrar</button>
        <NavLink to="/register">
          <p>Ainda não possui cadastro? <span>crie sua conta</span></p>
        </NavLink>
      </ButtonContainer>
    </LoginContainer>
  );
}