import { useEffect, useState } from "react";
import { LessonPage } from "@Praxeum-ai/LearnBlocks";
import { useParams } from "react-router-dom";
import { libraryApiSlice } from "../../../../services/api/librarySlice";


export default function Study() {

  const [bookData, setBookData] = useState<any>(null);
  const { bookId } = useParams();
  const { data } = libraryApiSlice.useGetLibraryBookQuery(bookId as string);

  useEffect(()=>{
    if (data) {
      setBookData(data.data);
    }
  }, [data]);
  return (
    <>
      { !bookData && 
        <div>
          Loading
        </div>
      }
      {
        bookData && 
        <div className="w-screen h-screen relative">
          <LessonPage
            textbook={bookData}
            chapters={bookData.chapters}
            lessons={[]}
          />
        </div>
      }
    </>
  )
}