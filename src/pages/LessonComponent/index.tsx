import React, { useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import RenderComponent from "./renderComp";
import { useLazyGetLessonSlidesQuery } from "../../services/api/lessonSlice";
import { useAppSelector } from "../../redux/store";

const LessonComponent = () => {
  const { id } = useParams();
  const student = useAppSelector((state) => state.user.user);
  const [getLesson] = useLazyGetLessonSlidesQuery();
  const [lesson, setLesson] = useState<any>();
  const [lessonSlides, setLessonSlides] = useState<any>([]);
  const fetchLessonData = async (id:any) => {
    await getLesson(id).then(response => {
      const lessonData = response.data.data;
      console.log(lessonData);
      setLesson(lessonData);
      const parseSlides = lessonData.LessonSlides.map((slide : any) => slide.slide_data);
      setLessonSlides(parseSlides);
    });
  }
  useEffect(()=>{
    fetchLessonData(id);
  },[]);
  return (
    <>
      <div className="bg-[#27397A] lg:bg-compbg lg:bg-cover nue w-full lg:h-screen pb-24 lg:pb-0 px-3 lg:px-6 xl:px-12">
        <div className="">
        <div className="flex text-white justify-between">
          <div className="lg:w-3/12 pt-6">
            <Link to="/home/subjects/6" className="flex gap-x-2 item-center">
              <MdArrowBack className="text-4xl" />
              <span className="fw-600 text-2xl mt-1">EXIT</span>
            </Link>
            { lesson && student && (<p className="mt-4">{lesson.Subject.naming} : {student.studentClassArm}</p>)}
          </div>
          <div className="w-6/12 relative">
            <img
              src="https://res.cloudinary.com/dic7regoe/image/upload/v1691443460/praxeum/Group_12598_mkbyg0.png"
              alt="board"
              className="w-full absolute"
            />
            <div className="mt-[9%] text-center relative">
              <p className="fw-600 text-black">Lesson 1</p>
              {lesson && (<p className="fw-600 text-[#FA14D5] text-lg">
                {lesson.topic}
              </p>)}
            </div>
          </div>
          <div className="lg:w-3/12 pt-6">
            <p className="mt-8 lg:pl-8">
              Chapter 1: Introduction to Basic science Lesson 3 of 5
            </p>
          </div>
        </div>
        </div>
        <div className="lg:hidden text-white">
          <div className="flex items-center justify-between pt-4">
            <Link to="/home" className="flex gap-x-2 item-center">
              <MdArrowBack className="text-3xl" />
              <span className="fw-600 text-2xl mt-1">EXIT</span>
            </Link>
            {lesson && student && (<p className="w-7/12 text-end">{lesson.Subject.naming}: {student.studentClassArm}</p>)}
          </div>
          <div>
            <p className="mt-4 text-center px-6">
              Chapter 1: Introduction to Basic science Lesson 3 of 5
            </p>
          </div>
          <div className="w-11/12 mx-auto h-20 oveflow-hidden text-center mt-4 relative">
            <img src="https://res.cloudinary.com/dic7regoe/image/upload/v1691566168/praxeum/Group_12535_prhvpt.png" alt="header" className="absolute w-full h-full top-0 left-0" />
            <div className="relative z-10 pt-2">
            <p className="fw-600 text-[#4F46E5]">Week 1</p>
            {lesson && (<p className="fw-600 text-[#FA14D5]">
              {lesson.topic}
            </p>)}
            </div>
          </div>
        </div>
        <div className="lg:mt-8 xl:mt-16 2xl:mt-24 w-full">
          {lessonSlides && lessonSlides.length && (<RenderComponent slides={lessonSlides}/>)}
        </div>
      </div>
    </>
  );
};

export default LessonComponent;
