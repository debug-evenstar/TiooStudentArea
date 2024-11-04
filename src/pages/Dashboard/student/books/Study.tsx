import { useEffect, useState } from "react";
import { LessonPage } from "@Praxeum-ai/LearnBlocks";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { libraryApiSlice } from "../../../../services/api/librarySlice";
import { ScaleLoader } from "react-spinners";

const Loader = () => (
    <div className="z-[9999999999] w-full h-screen bg-white flex items-center justify-center fixed inset-0">
        <ScaleLoader height={30} speedMultiplier={1.3} color="#9c29b2" />
    </div>
);

export default function Study() {
    const { bookId } = useParams();
    const { data, isLoading } = libraryApiSlice.useGetLibraryBookQuery(
        bookId as string
    );

    const location = useLocation();
    let { lesson, tag } = location.state || {};
    const retake = tag === "retake";
    const navigate = useNavigate();

    const [loaderOpen, setLoaderOpen] = useState(true);

    const bookData = data?.data;

    const [lessonData, setLessonData] = useState(lesson);

    useEffect(() => {
        if (!lesson) {
            navigate(-1);
        }
        setTimeout(() => setLoaderOpen(false), 2000);
    }, []);

    useEffect(() => {
        if (bookData) {
            const chapter = bookData.chapters.find(
                (c: any) => c.id == lesson.chapter_id
            );
            const getLesson = chapter.lessons.find(
                (l: any) => l.id == lesson.id
            );
            setLessonData(getLesson);
        }
    }, [bookData]);

    if (isLoading || !bookData) return <Loader />;

    return (
        <div className="w-screen h-full relative">
            <div
                className={`z-[9999999999] w-full h-screen transition-opacity duration-1000 bg-white flex items-center justify-center fixed inset-0
        ${loaderOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
            >
                <ScaleLoader
                    height={30}
                    speedMultiplier={1.3}
                    color="#9c29b2"
                />
            </div>
            {lesson && (
                <LessonPage
                    textbook={bookData}
                    chapters={bookData.chapters}
                    retake={retake}
                    lesson={lessonData}
                    back={() => navigate(-1)}
                />
            )}
        </div>
    );
}
