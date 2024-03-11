import styled from "styled-components";

import {Heading} from "../ui/Heading.js";
import {Button} from "@/ui/Button.tsx";
import {useMoveBack} from "@/hooks/useMoveBack.ts";

const StyledNotFoundPage = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  /* box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 3.2rem;
  }
`;

export const NotFoundPage = () => {
  const moveBack = useMoveBack();

  return (
    <StyledNotFoundPage>
      <Box>
        <Heading as="h1">
          The page you are looking for could not be found 😢
        </Heading>
        <Button onClick={moveBack} $size="large">
          &larr; Go back
        </Button>
      </Box>
    </StyledNotFoundPage>
  );
}

