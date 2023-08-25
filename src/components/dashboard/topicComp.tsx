import React, { FC, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import LessonItem from "./lessonItem";

interface LessonTopics {
  lessons : any
}

const TopicComponent:FC<LessonTopics> = ({lessons}) => {
  const [isClosed, setClosed] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(true);
  const closeContainer = () => {
    setClosed(true);
    setTimeout(() => {
      setOpen(!open);
      setClosed(false);
    }, 450);
  };
  const totalSlides = () => {
    let slideCount = 0;
    lessons.forEach((lesson :any )=>{
      slideCount += lesson.LessonSlides.length;
    });
    return slideCount;
  }
  const displayLesson = lessons?.filter((where:any) => where.admin_status !== "Locked")
  return (
    <>
      <div className="rounded-[8px] box-shade overflow-hidden">
        <div className="bg-frame bg-fit rounded-t-[8px] flex justify-between px-6 py-4">
          <p className="text-lg lg:text-3xl fw-600 text-white">Chapter 1</p>
          <div className="flex gap-x-1">
            {/* {lessons &&
              !!lessons.length &&
              lessons.map((item) => (
                <div key={item.name} className="bg-white rounded w-6 h-6"></div>
              ))} */}
          </div>
        </div>
        <div className="px-6 py-4 bg-white border-b border-[#E3E2FF]">
          <p className="text-lg lg:text-2xl text-[#87909E] fw-600">
            Introduction to Basic Science
          </p>
        </div>
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
        <div className="p-6 bg-white rounded-b-[8px] border-t border-[#E3E2FF] flex justify-between items-center" onClick={open? closeContainer : () => setOpen(true)}>
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

// const lessons = [
//   {
//     name: "The Environment",
//     slides: 5,
//     week: 1,
//     status: "completed",
//     time_frame: "9-11th",
//   },
//   {
//     name: "Air in Motion",
//     slides: 5,
//     week: 2,
//     status: "completed",
//     time_frame: "12-16th",
//   },
//   {
//     name: "Basics of Living things",
//     slides: 5,
//     week: 3,
//     status: "ongoing",
//     time_frame: "16-23th",
//   },
//   {
//     name: "Animals",
//     slides: 5,
//     week: 1,
//     status: "pending",
//     time_frame: "23-28th",
//   },
//   {
//     name: "Soil",
//     slides: 5,
//     week: 1,
//     status: "pending",
//     time_frame: "29-31st",
//   },
// ];
