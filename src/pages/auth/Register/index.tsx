import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { Input } from "../../../components/Input";
import { Logo } from "../../../components/Logo";
import { ButtonContainer, InputContainer, RegisterContainer } from "./styles";
import { auth, db } from "../../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true); 
    
    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        displayName: name,
        email: email,
        photoURL: '',
        joinedAt: new Date(),
        bio: ''
      });

      await auth.signOut();

      navigate("/login", { replace: true });
      toast.success("Registro realizado com sucesso! Faça login para continuar.");
      
    } catch (error) {
      setIsLoading(false);
      let errorMessage = "Falha no registro. O e-mail pode já estar em uso.";
      
      if (error instanceof Error) {
        switch (error.message) {
          case "Firebase: Error (auth/email-already-in-use).":
            errorMessage = "Este e-mail já está em uso.";
            break;
          case "Firebase: Error (auth/weak-password).":
            errorMessage = "A senha deve ter pelo menos 6 caracteres.";
            break;
          case "Firebase: Error (auth/invalid-email).":
            errorMessage = "E-mail inválido.";
            break;
        }
      }
      
      setError(errorMessage);
      console.error(error);
    }
  };

  return (
    <RegisterContainer onSubmit={handleSubmit}>
      <Logo /> 
      
      <InputContainer>
        <Input 
          placeholder="Nome e sobrenome" 
          type="text" 
          aria-label="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input 
          placeholder="E-mail" 
          type="email" 
          aria-label="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />         
        <Input 
          placeholder="Senha" 
          type="password" 
          aria-label="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input 
          placeholder="Confirme sua senha" 
          type="password" 
          aria-label="Confirme sua senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </InputContainer>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ButtonContainer>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Registrando..." : "Registrar"}
        </button>
        <NavLink to="/login">
          <p>Você já possui cadastro? <span>entre na sua conta</span></p>
        </NavLink>
      </ButtonContainer>
    </RegisterContainer>
  );
}