import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper';
import { LiaGreaterThanSolid, LiaLessThanSolid } from 'react-icons/lia'

// Import Swiper styles
import 'swiper/css/navigation';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { Navigation } from "swiper";
interface Props {
  data: any;
}
const ViewImgDoc: FC<Props> = ({ data }) => {
  const banner: string[] = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXCZ3ybFDWM3BONavxok4XLmoB4W1JVDXv-cSx2EaGf1iAgoLLEanKBUK5gHBiYux6lUU&usqp=CAU",
    "https://img.lovepik.com/background/20211101/small/lovepik-technological-information-mobile-wallpaper-background-image_400492405.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-2oI9NUcfoaqN3aYxvTdYdAtmjVkYtmPLGRGbfJ8ScUpdkptsGAFyK_TZxe1B04wPCnY&usqp=CAU",
    "https://i.pinimg.com/474x/2c/7f/3b/2c7f3b518811fb2af648c8c4f404e8f9.jpg",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8&w=1000&q=80",
  ];
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const navToSlides = () => {
    navigate(`/lesson/${data.id}`)
  }
  const navigationPrevRef = React.useRef(null)
  const navigationNextRef = React.useRef(null)
  return (
    <>
      <div>
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards, Navigation]}
        className="lg:w-[300px] lg:h-[550px] xl:w-[350px] relative"
        navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          onSlideChange={(state) => setCurrentIndex(state.activeIndex)}
      >
        {banner.map((slideContent, index) => (
        <SwiperSlide key={slideContent} virtualIndex={index}>
          <img src={slideContent} alt={`Image ${index}`} className="lg:w-[300px] lg:h-[550px] xl:w-[350px]"/>
        </SwiperSlide>
      ))}
      <div ref={navigationPrevRef} className={currentIndex === 0? "hidden" : ""}>
      <LiaLessThanSolid className="text-5xl text-white absolute top-2/4 -left-[160px]"/>
      </div>
      <div ref={navigationNextRef} className={currentIndex === banner.length -1? "hidden" : ""}>
            <LiaGreaterThanSolid className="text-5xl text-white absolute top-2/4 -right-[160px]"/>
      </div>
      </Swiper>
        <div className="flex justify-end mt-12">
            <img src='https://res.cloudinary.com/dic7regoe/image/upload/v1696583822/praxeum/Group_12638_laxj5x.png' onClick={navToSlides} alt="hello" className="w-36"/>
        </div>
      </div>
    </>
  );
};

export default ViewImgDoc;
