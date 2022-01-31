import { useEffect, useState } from 'react';

const useCheckWidth = (targetRange) => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width]);
  const [min, max] = targetRange;

  if (width >= min && width < max) {
    return true;
  }
  return false;
};
export default useCheckWidth;
