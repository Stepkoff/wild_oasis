import styled from "styled-components";
import React, {createContext, ReactNode, useContext, useState, MouseEvent, SetStateAction, useEffect} from "react";
import {HiEllipsisVertical} from "react-icons/hi2";
import {createPortal} from "react-dom";
import {useOutsideClick} from "@/hooks/useOutsideClick.ts";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  pointer-events: all;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul<{$position: {x: number, y: number}}>`
  position: fixed;
  pointer-events: all;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.$position.x}px;
  top: ${(props) => props.$position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

interface MenusContext {
  openId: number | null;
  handleClose: () => void;
  handleOpen: (val: number) => void;
  position: {
    x: number;
    y: number
  };
  setPosition: React.Dispatch<SetStateAction<{x: number, y: number}>>
}
const MenusContext = createContext<MenusContext>({
  openId: null,
  handleClose: () => {},
  handleOpen: () => {},
  position: {x: 0, y: 0},
  setPosition: () => {}
})

interface MenusProps {
  children: ReactNode
}
export const Menus = ({children}:MenusProps) => {
  const [openId, setOpenId] = useState<number | null>(null);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const handleClose = () => {
    setOpenId(null);
  }

  const handleOpen = (val: number) => {
    setOpenId(val)
  }

  return <MenusContext.Provider value={{openId: openId, handleOpen, handleClose, position, setPosition}}>
    {children}
  </MenusContext.Provider>
}

const Toggle = ({id}:{id: number}) => {
  const {openId, handleOpen, handleClose, setPosition} = useContext(MenusContext);

  const handleClick = (e:MouseEvent<HTMLButtonElement>) => {
    const element = e.currentTarget.closest('button') as Element;
    const rect = element.getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    })

    openId === null || openId !== id ? handleOpen(id) : handleClose();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical/>
    </StyledToggle>
  )
}

const List = ({id, children}:{id: number, children: ReactNode}) => {
  const {openId, position, handleClose} = useContext(MenusContext);

  const ref = useOutsideClick<HTMLUListElement>(handleClose)

  useEffect(() => {
    const element = document.body;
    const root  = document.querySelector('#root') as HTMLElement;

    if(typeof openId === 'number') {
      element.style.overflow = 'hidden';
      root.style.pointerEvents = 'none'
    }

    return () => {
      element.style.overflow = '';
      root.style.pointerEvents = ''
    }
  }, [openId])

  if(openId !== id) return null

  return createPortal(<StyledList ref={ref} $position={position}>{children}</StyledList>, document.querySelector('#root') as Element)
}

interface ButtonProps {
  children: ReactNode;
  icon: ReactNode;
  onClick?: () => void;
  disabled?: boolean
}
const Button = ({children, icon, onClick, disabled}:ButtonProps) => {
  const {handleClose} = useContext(MenusContext);

  const handleClick = () => {
    onClick?.()
    handleClose();
  }
  return (
    <li>
      <StyledButton disabled={disabled} onClick={handleClick}>{icon}<span>{children}</span></StyledButton>
    </li>
  )
}

Menus.Menu = StyledMenu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;