import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper";
import { LiaGreaterThanSolid, LiaLessThanSolid } from "react-icons/lia";

// Import Swiper styles
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/effect-cards";
import { Navigation } from "swiper";
import { FaTimes } from "react-icons/fa";
interface Props {
  data: string[];
  id: string | undefined;
}
const ViewImgDoc: FC<Props> = ({ data, id }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [viewDoc, setViewDoc] = useState(false);
  const navToSlides = () => {
    navigate(`/lesson/${id}`);
  };
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);
  return (
    <>
      <div>
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards, Navigation]}
          className="lg:w-[300px] lg:h-[550px] xl:w-[350px] relative"
          navigation={{ prevEl, nextEl }}
          onSlideChange={(state) => setCurrentIndex(state.activeIndex)}
        >
          {data.map((slideContent, index) => (
            <SwiperSlide key={slideContent} virtualIndex={index}>
              <img
                src={slideContent}
                alt={`Imag${index}`}
                className="lg:w-[300px] lg:h-[550px] xl:w-[350px]"
                onClick={() => setViewDoc(true)}
              />
            </SwiperSlide>
          ))}
          <div className="">
            <div
              ref={(node) => setPrevEl(node)}
              className={currentIndex === 0 ? "hidden" : ""}
            >
              <LiaLessThanSolid className="text-5xl text-white absolute top-2/4 -left-[160px] cursor-pointer" />
            </div>
            <div
              ref={(node) => setNextEl(node)}
              className={currentIndex === data.length - 1 ? "hidden" : ""}
            >
              <LiaGreaterThanSolid className="text-5xl text-white absolute top-2/4 -right-[160px] cursor-pointer" />
            </div>
          </div>
        </Swiper>
        <div className="flex justify-end mt-12">
          <img
            src="https://res.cloudinary.com/dic7regoe/image/upload/v1696583822/praxeum/Group_12638_laxj5x.png"
            onClick={navToSlides}
            alt="hello"
            className="w-36"
          />
        </div>
      </div>
      {viewDoc && (
        <div
          className="absolute w-full bg-modal h-screen place-center top-0 left-0"
          onClick={() => setViewDoc(false)}
        >
          <div
            className="w-7/12 h-[85vh] overflow-auto bg-white z-30 graybar animate-cover"
            onClick={(e: any) => e.stopPropagation()}
          >
            <img
              src={data[currentIndex]}
              alt={`Imag${currentIndex}`}
              className="w-full"
            />
          </div>
          <FaTimes className="absolute text-2xl text-white top-10 right-10 cursor-pointer" />
        </div>
      )}
    </>
  );
};

export default ViewImgDoc;
