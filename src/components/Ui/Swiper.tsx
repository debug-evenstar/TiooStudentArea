import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs, Navigation, Pagination, Autoplay, EffectFade } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade'
import "swiper/css/thumbs";
import "swiper/css/free-mode";

interface Props {
  items: JSX.Element[];
  [key: string]: any;
}

const AppSwiper: React.FC<Props> = ({
  items,
  ...rest
}) => {


  return (
    <Swiper
      modules={[FreeMode, Navigation, Pagination, Autoplay, EffectFade, Thumbs]}
      {...rest}
    >
      {items &&
        items.map((item, index) => (
          <SwiperSlide key={index} virtualIndex={index}>
            {item}
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default AppSwiper;