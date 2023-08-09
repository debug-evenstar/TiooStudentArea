import React, {useState, useEffect} from 'react'
import MobileComponent from '../../components/lessonComponent/MobileComponent'
import DesktopComponent from '../../components/lessonComponent/DesktopComponent'

const RenderComponent = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Event listener function to update the screen width state
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Attach the event listener
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const breakpoint = 930;

  return (
    <div>
      {screenWidth < breakpoint ? (
        <MobileComponent />
      ) : (
        <DesktopComponent />
      )}
    </div>
  );
}

export default RenderComponent