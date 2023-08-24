import React, {useState, useEffect, FC} from 'react'
import MobileComponent from '../../components/lessonComponent/MobileComponent'
import DesktopComponent from '../../components/lessonComponent/DesktopComponent'

interface ComponentSlides {
  slides : any[]
}
// Will make typed later
//lessonSlides: (TextData | ButtonGroupData | SliderData | ImageData | FlashCardData | VideoData | WordMatchData | OptionData)[][];

const RenderComponent : FC<ComponentSlides> = ({slides}) => {
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
        <DesktopComponent slides={slides}/>
      )}
    </div>
  );
}

export default RenderComponent