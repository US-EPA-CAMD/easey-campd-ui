import { useEffect, useRef } from 'react';

const useClickOutClose = (handler) => {
  const ref = useRef();
  useEffect(() => {
    const clickOutClose = (e) => {
      if (!ref.current.contains(e.target)) {
        handler();
      }
    };
    document.addEventListener('click', clickOutClose);
    return () => document.removeEventListener('click', clickOutClose);
  });
  return ref;
};
export default useClickOutClose;
