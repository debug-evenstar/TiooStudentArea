import {useState, useEffect, FC} from 'react'
import MobileComponent from '../../old-components/lessonComponent/MobileComponent'
import DesktopComponent from '../../old-components/lessonComponent/DesktopComponent'

interface ComponentSlides {
  slides : any[]
  back : Function;
}
// Will make typed later
//lessonSlides: (TextData | ButtonGroupData | SliderData | ImageData | FlashCardData | VideoData | WordMatchData | OptionData)[][];

const RenderComponent : FC<ComponentSlides> = ({slides, back}) => {
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
        <MobileComponent slides={slides} back={back}/>
      ) : (
        <DesktopComponent slides={slides} back={back}/>
      )}
    </div>
  );
}

export default RenderComponent