import {useEffect, useRef} from "react";

//eslint-disable-next-line
export const useOutsideClick = (handler: () => void , dependency: any, eventCapturing: boolean = true) => {
  const ref = useRef<HTMLDivElement>(null);

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
  }, [dependency])
  return ref
}