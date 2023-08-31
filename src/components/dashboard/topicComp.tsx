import React, { FC, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import LessonItem from "./lessonItem";
import { LessonSkelLoader } from "../Ui/SkeltonLoader";

interface LessonTopics {
  lessons : any
  busy: boolean
}

const TopicComponent:FC<LessonTopics> = ({lessons, busy}) => {
  const [isClosed, setClosed] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(true);
  const closeContainer = () => {
    setClosed(true);
    setTimeout(() => {
      setOpen(!open);
      setClosed(false);
    }, 450);
  };
  
  const displayLesson = lessons?.filter((where:any) => where.published !== 0)
  
  const totalSlides = () => {
    let slideCount = 0;
    displayLesson.forEach((lesson :any )=>{
      slideCount += lesson.LessonSlides.length;
    });
    return slideCount;
  }
  return (
    <>
      <div className="rounded-[8px] box-shade overflow-hidden">
        <div className="bg-frame3 bg-fit rounded-t-[8px] flex items-center justify-between px-6 py-4">
          <p className="text-lg lg:text-3xl fw-700 text-[#030036BD]">First Term</p>
          <div className="flex gap-x-2">
            {lessons &&
              !!displayLesson.length &&
              displayLesson.map((item:any) => (
                <div key={item.name} className="bg-[#4F46E5] rounded-[4px] w-6 h-6"></div>
              ))}
          </div>
        </div>
        <div className="px-6 py-4 bg-white border-b border-[#E3E2FF]">
          {/* <p className="text-lg lg:text-2xl text-[#87909E] fw-600">
            Introduction to Basic Science
          </p> */}
        </div>
        {busy && <LessonSkelLoader/>}
        {open && (
          <div
            className={`bg-white grid lg:grid-cols-3 px-2 py-4 lg:p-8 gap-y-4 lg:gap-12 ${
              isClosed ? "dropoff" : "dropin"
            }`}
          >
            {displayLesson &&
              !!displayLesson.length &&
              displayLesson.map((item : any, index : any) => (
                <LessonItem key={index} item={item}/>
              ))}
          </div>
        )}
        <div className="p-6 bg-white rounded-b-[8px] border-t border-[#E3E2FF] flex justify-between items-center relative index-20" onClick={open? closeContainer : () => setOpen(true)}>
          <div className="flex items-center gap-x-2">
            <p className="text-[#87909E] fw-600">{`${displayLesson.length} lessons,`}</p>
            <p className="text-[#87909E] fw-600">{totalSlides()} slides</p>
          </div>
          {open ? (
            <FaAngleUp
              className="text-xl text-primary cursor-pointer"
              onClick={closeContainer}
            />
          ) : (
            <FaAngleDown
              className="text-xl text-primary cursor-pointer"
              onClick={() => setOpen(true)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default TopicComponent;

