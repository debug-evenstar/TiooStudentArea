import React, { useCallback, useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { FaLock, FaLockOpen, FaPause, FaPlay, FaRedo } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useExamNotice } from "../../../hooks/useExamNotice";

const SmartCase = React.memo(({ hasSession, bookId }: any) => {
  const navigate = useNavigate();

  const handleOpenLesson = useCallback(() => {
    if (hasSession) {
      navigate(`/books/${bookId}/study`);
    }
  }, [navigate, bookId, hasSession]);

  return (
    <div className="bg-white flex justify-between border-b relative border-gray-400">
      <div className="lg:px-5 px-2 py-4 flex justify-between">
        <p className="urbanist text-[23px] urbanist mb-1 font-[500] text-[#30B0C7]">
          Smart Case
        </p>
      </div>
      <div className="w-[8rem] lg:w-[13rem] bg-[#f3f3f3] min-h-[8rem] flex justify-between flex-col">
        <div className="grow flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
            {/* Add SVG or icon if needed */}
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
});

const LessonItem = React.memo(
  ({ lesson, bookId, open, hasSession }: any) => {
    const navigate = useNavigate();
    const { showNotice, closeNotice, isNoticeOpen } = useExamNotice();

    const handleOpenLesson = (tag: string | null) => {
      if (!hasSession && !isNoticeOpen) {
        showNotice();
        return;
      }
      navigate(`/books/${bookId}/study`, { state: { lesson, tag } });
    };

    const isLocked = lesson.status === "LOCKED";

    return (
      <div className="bg-white flex justify-between border-b relative border-gray-400">
        <div className="lg:px-5 px-2 py-4 w-full flex justify-between">
          <div>
            <p className="urbanist text-[20px] mb-1 font-[500] text-primary">
              {lesson?.topic}
            </p>
          </div>
        </div>
        {open && (
          <div className="w-[8rem] lg:w-[13rem] shrink-0 relative bg-[#f3f3f3] min-h-[8rem] flex justify-between flex-col">
            <div className="grow flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                {lesson.is_completed && <FaRedo className="text-primary text-xl" />}
                {lesson.has_started && !lesson.is_completed && <FaPause className="text-primary" />}
                {!lesson.has_started && !lesson.is_completed && <FaPlay className="text-primary" />}
              </div>
            </div>

            {isLocked ? (
              <button
                disabled
                className="h-12 w-full bg-[#18D741] flex justify-center cursor-not-allowed items-center text-white"
              >
                <FaLock color="white" size={23} />
              </button>
            ) : (
              <div>
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
                {!lesson.has_started && !lesson.is_completed && (
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
        )}
      </div>
    );
  }
);

const StudyLessonAccordion = ({ chapter, bookId, hasSession }: any) => {
  const [open, setOpen] = useState(true);
  const [lessons, setLessons] = useState<any>([]);

  const lessonCount = chapter?.lessons?.length || 0;

  useEffect(() => {
    if (chapter?.lessons?.length) {
      const sorted = [...chapter.lessons].sort(
        (a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
      setLessons(sorted);
    }
  }, [chapter]);

  return (
    <div className="rounded-lg shadow mb-8 lg:mb-3 relative transition-[height] duration-300">
      <div
        onClick={() => setOpen(true)}
        className="bg-[#30B0C7] outline-none w-full h-[58px] flex items-center font-bold text-white urbanist px-5 rounded-t-lg text-[20px]"
      >
        {chapter?.name ?? "Lesson Name"}
      </div>
      <div>
        {lessons.slice(0, 1).map((lesson: any, index: number) => (
          <LessonItem
            open={open}
            key={index}
            hasSession={hasSession}
            bookId={bookId}
            lesson={lesson}
          />
        ))}
      </div>
      <div className={`${!open ? "hidden" : ""} relative flex flex-col`}>
        {lessons.slice(1).map((lesson: any, index: number) => (
          <LessonItem
            open={open}
            key={index}
            hasSession={hasSession}
            bookId={bookId}
            lesson={lesson}
          />
        ))}
        <SmartCase hasSession={hasSession} bookId={bookId} />
      </div>
      <div className="rounded-b-lg h-[50px] border-t justify-between bg-white flex items-center font-semibold text-gray-700 urbanist px-5 text-base">
        {lessonCount > 1 && (
          <button
            className="outline-none flex gap-1 items-center"
            onClick={() => setOpen(!open)}
          >
            See {open ? "less" : "more"} lessons
            <BiChevronDown className={open ? "rotate-180" : ""} />
          </button>
        )}
        <span>{lessonCount} lessons</span>
      </div>
    </div>
  );
};

export default StudyLessonAccordion;
