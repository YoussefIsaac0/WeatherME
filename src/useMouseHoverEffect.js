// useMouseMoveEffect.js
import { useEffect, useRef } from 'react';


export function useMouseHoverEffect() {
    const containerRef = useRef(null);

    useEffect(() => {
      const handleMouseMove = (e) => {
        if (containerRef.current) {
          const x = e.pageX - containerRef.current.offsetLeft;
          const y = e.pageY - containerRef.current.offsetTop;
          containerRef.current.style.setProperty('--x', `${x}px`);
          containerRef.current.style.setProperty('--y', `${y}px`);
        }
      };
  
      const currentRef = containerRef.current;
      if (currentRef) {
        currentRef.addEventListener('mousemove', handleMouseMove);
      }
  
      return () => {
        if (currentRef) {
          currentRef.removeEventListener('mousemove', handleMouseMove);
        }
      };
    }, []);
  
    return containerRef;
}


export default useMouseHoverEffect;
