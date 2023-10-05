import React, {useEffect, useState} from 'react'
import { MdArrowBack } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom';
import { useLazyGetLessonSlidesQuery } from '../../services/api/lessonSlice';
import ViewImgDoc from '../../components/library/viewImgDoc';

const PreviewTemplateDoc = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    // const student = useAppSelector((state) => state.user.user);
    const [getLesson] = useLazyGetLessonSlidesQuery();
    const [lesson, setLesson] = useState<any>();
    const [lessonSlides, setLessonSlides] = useState<any>([]);
    const fetchLessonData = async (id:any) => {
      await getLesson(id).then(response => {
        const lessonData = response.data.data;
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
        <div className="bg-brown lg:bg-cover bg-fixed nue w-full h-screen overflow-y-auto pb-24 lg:pb-0 px-3 lg:px-6 xl:px-12">
        <div className="">
        <div className="hidden lg:flex text-white justify-between">
          <div className="lg:w-3/12 pt-6">
            <div className="flex gap-x-2 item-center cursor-pointer" onClick={() => navigate(-1)}>
              <MdArrowBack className="text-4xl" />
              <span className="fw-600 text-2xl mt-1">EXIT</span>
            </div>
          </div>
          <div className="w-5/12 relative">
            <img
              src="https://res.cloudinary.com/dic7regoe/image/upload/v1691443460/praxeum/Group_12598_mkbyg0.png"
              alt="board"
              className="w-full absolute"
            />
            <div className="mt-[9%] text-center relative">
              {/* <p className="fw-600 text-black text-lg">Lesson 1</p> */}
              {lesson && (<p className="font-bold  text-[#FA14D5] pt-3 text-xl 2xl:text-2xl ">
                {lesson.topic}
              </p>)}
            </div>
          </div>
          <div className="lg:w-3/12 pt-6">
          </div>
        </div>
        </div>
        <div className="lg:hidden text-white">
          <div className="flex items-center justify-between pt-4">
            <div className="flex gap-x-2 item-center cursor-pointer" onClick={() => navigate(-1)}>
              <MdArrowBack className="text-3xl" />
              <span className="fw-600 text-2xl mt-1">EXIT</span>
            </div>
          </div>
          <div>
          </div>
          <div className="w-11/12 mx-auto h-20 oveflow-hidden text-center mt-4 relative">
            <img src="https://res.cloudinary.com/dic7regoe/image/upload/v1691566168/praxeum/Group_12535_prhvpt.png" alt="header" className="absolute w-full h-full top-0 left-0" />
            <div className="relative z-10 pt-3">
            <p className="fw-600 text-[#4F46E5]">Week 1</p>
            {lesson && (<p className="fw-600 text-[#FA14D5]">
              {lesson.topic}
            </p>)}
            </div>
          </div>
        </div>
        <div className="lg:mt-16 mb-16 w-full">
            <ViewImgDoc data={[]}/>
        </div>
      </div>
    </>
  )
}

export default PreviewTemplateDoc