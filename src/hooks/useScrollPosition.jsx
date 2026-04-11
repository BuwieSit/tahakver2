import { useState, useEffect } from 'react';

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState({ scrollX: 0, scrollY: 0 });

  useEffect(() => {
    function updatePosition() {

      setScrollPosition({ scrollX: window.scrollX, scrollY: window.scrollY });
    }

    window.addEventListener('scroll', updatePosition);
    updatePosition(); 


    return () => window.removeEventListener('scroll', updatePosition);
  }, []); 
  
  return scrollPosition;
};
