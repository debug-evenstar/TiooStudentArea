import React from 'react'
import { useGetFreeSlidesQuery } from '../../services/api/lessonSlice'
import { ThreeCirclesLoading } from '../../components/Ui/Loading';
import { LessonPage } from '@Praxeum-ai/LearnBlocks';

const PreviewBook = () => {
    const {data, isLoading} = useGetFreeSlidesQuery()
    const parseSlides = data?.data?.LessonSlides.map((slide : any) => slide.slide_data);
  return (
    <>
        {
            isLoading && <div className="w-full h-screen grid place-content-center">
            <ThreeCirclesLoading size="200" color="#4f46e5" />
          </div>
        }
        {
            parseSlides && <LessonPage
            subject=""
            className=""
            title={data ? data.data.topic : ""}
            slides={parseSlides}
            back={() => window.close()}
          />
        }
    </>
  )
}

export default PreviewBook