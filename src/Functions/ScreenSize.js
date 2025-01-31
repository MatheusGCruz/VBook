import { useState, useEffect } from 'react';

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth>window.innerHeight?0.4*window.innerWidth:window.innerWidth,
    height: .95*window.innerHeight,
    font: .02*window.innerHeight,
    verticalPadding: .02*window.innerHeight,
    horizontalPadding: window.innerWidth>window.innerHeight?.07*window.innerHeight:.03*window.innerHeight,
    charDensity:window.innerWidth>window.innerHeight?0.5*window.innerWidth:2.5*window.innerWidth
  });

  useEffect(() => {
    const handleResize = () => {
        
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenSize;
};

export default useScreenSize;