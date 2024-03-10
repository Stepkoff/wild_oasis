import {useEffect, useRef} from "react";

//eslint-disable-next-line
export const useOutsideClick = <T extends Element>(handler: () => void, eventCapturing: boolean = true) => {
  const ref = useRef<T>(null);

  useEffect(() => {

    const handleOutsideClick = (e:MouseEvent) => {
      if(ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    }

    document.addEventListener('click', handleOutsideClick, eventCapturing)

    return () => {
      document.removeEventListener('click', handleOutsideClick, eventCapturing)
    }
  }, [handler, eventCapturing])
  return ref
}