import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLazyGetLessonSlidesQuery } from "../../services/api/lessonSlice";
// import { LessonPage } from "@Praxeum-ai/LearnBlocks";

const LessonComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const returnToLessons = () => {
    navigate(-1);
  }
  useEffect(()=>{
    fetchLessonData(id);
  },[]);
  return (
    <>
      {/* <LessonPage
        subject=""
        className=""
        title={lesson ? lesson.topic : ""}
        slides={lessonSlides}
        back={() => returnToLessons()}
      /> */}
    </>
  );
};

export default LessonComponent;
