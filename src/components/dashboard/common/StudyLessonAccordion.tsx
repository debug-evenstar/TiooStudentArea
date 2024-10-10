import React, { useCallback, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const chapter = {
  name: "New chapter",
  topics: ["topic", "new topic", "stuff", "happened"],
};

const SmartCase = ({ lesson, bookId }: any) => {
  const navigate = useNavigate();

  const handleOpenLesson = useCallback(() => {
    // navigate(`/books/${bookId}/study`);
  }, [navigate, bookId]);

  return (
    <div className="bg-white flex justify-between border-b relative border-gray-400">
      <div className="grow px-5 py-4">
        <p className="urbanist text-[23px] urbanist mb-1 font-[500] text-[#30B0C7]">
          {"Smart Case"}
        </p>
        <p className="flex font-[300] capitalize text-gray-600 items-center gap-x-2">
          {/* <span className="text-xl">+</span>
          <span>{lesson?.description}</span> */}
        </p>
        {/* <ul>
          {lesson?.topics?.map((topic: string, index: number) => (
            <li
              key={index}
              className="flex font-[300] capitalize text-gray-600 items-center gap-x-2"
            >
              <span className="text-xl">+</span>
              <span>{topic}</span>
            </li>
          ))}
        </ul> */}
      </div>
      <div className="w-[13rem] bg-[#f3f3f3] min-h-[8rem] flex justify-between flex-col">
        <div className="grow flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
            <svg
              className="hidden"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.6282 0.335816C16.3221 0.165663 15.9854 0.0574871 15.6375 0.0174658C15.2895 -0.0225554 14.9371 0.00636218 14.6003 0.102567C14.2635 0.198772 13.949 0.36038 13.6747 0.57816C13.4004 0.79594 13.1717 1.06563 13.0016 1.37182L8.05091 10.2811L5.21758 7.44781C4.97159 7.19312 4.67734 6.98997 4.35199 6.85021C4.02665 6.71045 3.67673 6.63689 3.32265 6.63381C2.96857 6.63074 2.61743 6.69821 2.2897 6.83229C1.96198 6.96637 1.66424 7.16438 1.41386 7.41476C1.16348 7.66514 0.965472 7.96288 0.83139 8.2906C0.697308 8.61833 0.629836 8.96947 0.632913 9.32355C0.63599 9.67763 0.709553 10.0275 0.849311 10.3529C0.989068 10.6782 1.19222 10.9725 1.44691 11.2185L6.78025 16.5518C7.28425 17.0571 7.96425 17.3345 8.66558 17.3345L9.03491 17.3078C9.44365 17.2506 9.83353 17.0994 10.1739 16.8659C10.5142 16.6325 10.7957 16.3232 10.9962 15.9625L17.6629 3.96248C17.8331 3.65642 17.9414 3.31982 17.9815 2.97192C18.0216 2.62402 17.9928 2.27162 17.8967 1.93485C17.8006 1.59808 17.6392 1.28353 17.4215 1.00917C17.2039 0.734806 16.9343 0.506 16.6282 0.335816Z"
                fill="#9C29B2"
              />
            </svg>
          </div>
        </div>
        <button
          onClick={handleOpenLesson}
          className="h-12 w-full bg-[#30B0C7] text-white"
        >
          START
        </button>
      </div>
    </div>
  );
};

const LessonItem = ({ lesson, bookId, open }: any) => {
  const navigate = useNavigate();
  const handleOpenLesson = useCallback(
    (tag: string | null) => {
      navigate(`/books/${bookId}/study`, { state: { lesson, tag: tag } });
    },
    [navigate, bookId]
  );

  return (
    <div className="bg-white flex justify-between items-center border-b relative border-gray-400">
      <div className="grow px-5 py-4">
        <p className="urbanist text-[20px] mb-1 font-[500] text-primary">
          {lesson?.topic ?? "Chapter Name"}
        </p>
        <p className="flex font-[300] capitalize text-gray-600 items-center gap-x-2">
          <span className="text-xl">+</span>
          <span>{lesson?.description}</span>
        </p>
        {/* <ul>
          {lesson?.topics?.map((topic: string, index: number) => (
            <li
              key={index}
              className="flex font-[300] capitalize text-gray-600 items-center gap-x-2"
            >
              <span className="text-xl">+</span>
              <span>{topic}</span>
            </li>
          ))}
        </ul> */}
      </div>
      {open && (
        <div className="w-[13rem] bg-[#f3f3f3] min-h-[8rem] flex justify-between flex-col">
          <div className="grow flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
              <svg
                className={`${lesson.is_completed ? "" : "hidden"}`}
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.6282 0.335816C16.3221 0.165663 15.9854 0.0574871 15.6375 0.0174658C15.2895 -0.0225554 14.9371 0.00636218 14.6003 0.102567C14.2635 0.198772 13.949 0.36038 13.6747 0.57816C13.4004 0.79594 13.1717 1.06563 13.0016 1.37182L8.05091 10.2811L5.21758 7.44781C4.97159 7.19312 4.67734 6.98997 4.35199 6.85021C4.02665 6.71045 3.67673 6.63689 3.32265 6.63381C2.96857 6.63074 2.61743 6.69821 2.2897 6.83229C1.96198 6.96637 1.66424 7.16438 1.41386 7.41476C1.16348 7.66514 0.965472 7.96288 0.83139 8.2906C0.697308 8.61833 0.629836 8.96947 0.632913 9.32355C0.63599 9.67763 0.709553 10.0275 0.849311 10.3529C0.989068 10.6782 1.19222 10.9725 1.44691 11.2185L6.78025 16.5518C7.28425 17.0571 7.96425 17.3345 8.66558 17.3345L9.03491 17.3078C9.44365 17.2506 9.83353 17.0994 10.1739 16.8659C10.5142 16.6325 10.7957 16.3232 10.9962 15.9625L17.6629 3.96248C17.8331 3.65642 17.9414 3.31982 17.9815 2.97192C18.0216 2.62402 17.9928 2.27162 17.8967 1.93485C17.8006 1.59808 17.6392 1.28353 17.4215 1.00917C17.2039 0.734806 16.9343 0.506 16.6282 0.335816Z"
                  fill="#9C29B2"
                />
              </svg>
            </div>
          </div>
          {lesson.has_started && !lesson.is_completed && (
            <button
              onClick={() => handleOpenLesson("resume")}
              className="h-12 w-full bg-primary text-white"
            >
              RESUME
            </button>
          )}
          {lesson.is_completed && (
            <button
              onClick={() => handleOpenLesson("retake")}
              className="h-12 w-full bg-red-500 text-white"
            >
              RETAKE
            </button>
          )}
          {!lesson.has_started && (
            <button
              onClick={() => handleOpenLesson("start")}
              className="h-12 w-full bg-[#18D741] text-white"
            >
              START
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default function StudyLessonAccordion({ chapter, bookId }: any) {
  const [open, setOpen] = useState(true);
  const firstLesson = chapter?.lessons[0];
  const lessonCount = chapter?.lessons.length;
  return (
    <div className="rounded-lg  shadow mb-3 transition-[height] duration-300">
      <button
        onClick={() => setOpen(true)}
        className="bg-[#30B0C7] outline-none w-full h-[58px] flex items-center font-bold text-white urbanist px-5 rounded-t-lg text-[20px]"
      >
        {chapter?.name ?? "Lesson Name"}
      </button>
      <div>
        {firstLesson && (
          <LessonItem open={open} bookId={bookId} lesson={firstLesson} />
        )}
      </div>
      <div className={!open ? "hidden" : ""}>
        {chapter?.lessons
          ?.slice(1, lessonCount)
          .map((lesson: any, index: number) => (
            <LessonItem
              open={open}
              key={index}
              bookId={bookId}
              lesson={lesson}
            />
          ))}
        <SmartCase />
      </div>
      <div className="rounded-b-lg h-[50px] border-t justify-between bg-white flex items-center font-semibold text-gray-700 urbanist px-5 text-base">
        {lessonCount > 1 ? (
          <button className="outline-none flex gap-1 items-center" onClick={() => setOpen(!open)}>
            See {open ? "less" : "more"} lessons
            <BiChevronDown className={open ? "rotate-180": ""}/>
          </button>
        ) : (
          <p></p>
        )}
        <span>{lessonCount ?? 0} lessons</span>
      </div>
    </div>
  );
}
