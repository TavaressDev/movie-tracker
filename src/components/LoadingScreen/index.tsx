import { LoadingContainer, Spinner } from "./styles";

export function LoadingScreen() {
    return (
      <LoadingContainer>
        <Spinner />
        <p>Carregando...</p>
      </LoadingContainer>
    );
  }