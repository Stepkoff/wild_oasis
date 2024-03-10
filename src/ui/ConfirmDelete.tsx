import styled from "styled-components";
import {Button} from "./Button.tsx";
import {Heading} from "./Heading.js";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

interface ConfirmDelete {
  resourceName: string
  onConfirm: () => void
  disabled: boolean
  onClose?: () => void
}

export const ConfirmDelete = ({ resourceName, disabled, onConfirm, onClose }:ConfirmDelete) => {

  const handleDelete = () => {
    onConfirm()
    onClose?.()
  }

  const handleCancel = () => {
    onClose?.()
  }

  return (
    <StyledConfirmDelete>
      <Heading as="h3">Delete {resourceName}</Heading>
      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div>
        <Button onClick={handleCancel} $variation="secondary" disabled={disabled}>
          Cancel
        </Button>
        <Button onClick={handleDelete} $variation="danger" disabled={disabled}>
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

