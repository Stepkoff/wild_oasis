import styled from "styled-components";
import React, {cloneElement, createContext, useContext, useState} from "react";
import {HiXMark} from "react-icons/hi2";
import {createPortal} from "react-dom";
import {useOutsideClick} from "@/hooks/useOutsideClick.ts";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
      background-color: var(--color-grey-100);
  }

  & svg {
      width: 2.4rem;
      height: 2.4rem;
      /* Sometimes we need both */
      /* fill: var(--color-grey-500);
      stroke: var(--color-grey-500); */
      color: var(--color-grey-500);
  }
`;

// interface ModalProps {
//   children: React.ReactNode,
//   onClose: () => void
// }
// export const Modal = ({children, onClose}:ModalProps) => {
//
//   return createPortal (
//     <Overlay>
//       <StyledModal>
//         <Button onClick={onClose}><HiXMark/></Button>
//         <div>
//           {children}
//         </div>
//       </StyledModal>
//     </Overlay>,
//     document.querySelector('#root') as Element
//   )
// }

interface ModalContext {
  handleOpen: React.Dispatch<React.SetStateAction<string>>
  handleClose: () => void;
  openName: string
}
const ModalContext = createContext<ModalContext>({
  openName: '',
  handleOpen: () => {},
  handleClose: () => {},
})

interface ModalProps {
  children: React.ReactNode
}
export const Modal = ({children}:ModalProps) => {
  const [openName, setOpenName] = useState('')

  const handleClose = () => {
    setOpenName('')
  }
  return <ModalContext.Provider value={{
    openName: openName,
    handleOpen: setOpenName,
    handleClose: handleClose
  }}>
    {children}
  </ModalContext.Provider>
}
interface OpenProps {
  children: React.ReactElement;
  openWindowName: 'cabin-form' | 'confirm-delete'
}
const Open = ({openWindowName, children}:OpenProps) => {
  const {handleOpen} = useContext(ModalContext)
  return cloneElement(children, {onClick: () => handleOpen(openWindowName)})
}

interface WindowProps {
  children: React.ReactElement,
  openWindowName: 'cabin-form' | 'confirm-delete'
}

const Window = ({children, openWindowName}:WindowProps) => {
  const {handleClose, openName} = useContext(ModalContext);
  const modalRef = useOutsideClick<HTMLDivElement>(handleClose)

  if(openWindowName !== openName) return null

  return createPortal(
    <Overlay>
      <StyledModal ref={modalRef}>
        <Button onClick={handleClose}><HiXMark/></Button>
        <div>
          {cloneElement(children, {onClose: handleClose})}
        </div>
      </StyledModal>
    </Overlay>,
    document.querySelector('#root') as Element
  )
}

Modal.Open = Open
Modal.Window = Window