import React, {useState} from "react";
import AppSwiper from "../Ui/Swiper";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { useGetUpcomingLessonQuery } from "../../services/api/routineSlice";

const ComingUp = () => {
  const [slide, setSlide] = useState(false)
  const {data} = useGetUpcomingLessonQuery()

  const RenderLessonItem = ({ item, index }: any) => {
    return (
      <div className="bg-white relative w-full h-full">
        <div className="flex justify-center">
          <p className={`underline px-1 ${index <= 1? 'text-[#E7A70B]' : 'text-[#86A94B]'}`}>{item.name}</p>
          <MdOutlineKeyboardArrowDown className="text-2xl cursor-pointer absolute -right-1 -top-0" onClick={() => setSlide(false)}/>
        </div>
        <div className="mt-4">
          <p className="text-[#1E1E1E80] fs-500">{item.desc}</p>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="border-2 border-[#00000026] rounded p-2 bg-white">
        <div className="relative text-center border-b-2 pb-5 mb-5">
          <p className="text-[#87909E]">Week 2</p>
          <p className="mt-1 fs-600 text-xl fw-600">Coming Up</p>
          <div className="absolute w-12 bg-white flex justify-center h-7 left-[45%] -bottom-5">
            <p className="bg-[#FF006E] w-4 h-4 rotate-icon"></p>
          </div>
        </div>
        <div className="mt-4 text-center fw-600 w-9/12 mx-auto pb-6">
          
          {/* <p className="text-[13px] text-[#87909E] mb-2">19 -24 June</p> */}
          {slide && <AppSwiper
            items={
              lessons &&
              lessons.map((item: any, index: number) => (
                <RenderLessonItem item={item} key={index} index={index} />
              ))
            }
            autoplay={{
              delay: 4000,
            }}
            effect="fade"
            slidesPerView={1}
            spaceBetween={20}
            className="w-full h-44 lg:px-10 px-4"
          />}
          <div>
          {
            !slide && (
              <div className="relative">
                {
                  data && !!data.data.length && data.data.slice(0,5).map((item:any, index:number) => (
                    <p className={`underline mt-2 ${index <= 1? 'text-[#E7A70B]' : 'text-[#86A94B]'}`}>{item.topic}</p>
                  ))
                }
                <MdOutlineKeyboardArrowUp className="text-2xl cursor-pointer absolute -top-0 -right-8" onClick={() => setSlide(true)}/>
              </div>
            )
          }
          </div>
        </div>
      </div>
    </>
  );
};

export default ComingUp;

const lessons = [
  {
    name: "Basics of Living and Non-living things",
    desc: "A crucial foundation to all life sciences, life cycles, biology and ecology. You will learn to group living things together to see the important characteristics they share.",
  },
  {
    name: "Mean, mode & Median",
    desc: "A crucial foundation to all life sciences, life cycles, biology and ecology. You will learn to group living things together to see the important characteristics they share.",
  },
  {
    name: "Phonetics & Pronunciation",
    desc: "lorSunt deserunt ipsum duis ipsum cupidatat ea.",
  },
  {
    name: "Basics of Coding",
    desc: "Magna fugiat consequat mollit laborum cupidatat mollit enim Lorem consectetur cupidatat. Nisi excepteur aliqua in ea nulla culpa ipsum. Ullamco occaecat excepteur mollit dolor.",
  },
  {
    name: "Statistics And Mathematics",
    desc: "Ad sunt minim occaecat ullamco Lorem velit magna minim ex proident pariatur mollit in officia. Non et veniam ea Lorem culpa sit tempor. Consequat nisi voluptate et ipsum.",
  },
];
