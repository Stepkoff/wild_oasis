import styled from "styled-components";

const LoginLayout = styled.main`
  min-height: 100dvh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

export const LoginPage = () => {
  return <LoginLayout>Login page</LoginLayout>;
}
