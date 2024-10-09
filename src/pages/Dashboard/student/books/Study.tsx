import { useEffect, useState } from "react";
import { LessonPage } from "@Praxeum-ai/LearnBlocks";
import { useLocation, useParams } from "react-router-dom";
import { libraryApiSlice } from "../../../../services/api/librarySlice";
import { ScaleLoader } from "react-spinners";

export default function Study() {
  const [bookData, setBookData] = useState<any>(null);
  const { bookId } = useParams();
  const { data } = libraryApiSlice.useGetLibraryBookQuery(bookId as string);

  const location = useLocation();

  const { lesson, tag } = location.state;


  const resume = tag == "resume";
  const retake = tag == "retake";


  useEffect(() => {
    if (data) 
      setBookData(data.data);
  }, [data]);

  return (
    <>
      {!bookData && (
        <div className="w-full h-screen inset-0 absolute flex items-center justify-center">
          <span>
            <ScaleLoader height={30} speedMultiplier={1.3} color="#9c29b2" />
          </span>
        </div>
      )}
      {bookData && (
        <div className="w-screen h-screen relative">
          {lesson && (
            <LessonPage
              textbook={bookData}
              chapters={bookData.chapters}
              retake={false}
              lesson={lesson}
            />
          )}
        </div>
      )}
    </>
  );
}
