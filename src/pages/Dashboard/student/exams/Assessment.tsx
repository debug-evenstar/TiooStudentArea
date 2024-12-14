import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AssessmentPage } from "@Praxeum-ai/LearnBlocks";
import { ScaleLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/reducers/userReducer";
import { examsApiSlice } from "../../../../services/api/examsSlice";

export default function Assessment() {
  const { exam_id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [data, setData] = useState(null);
  const [fetchSet, { isLoading, data:  examSetResponse }] =
    examsApiSlice.useLazyGetActiveExamSetQuery();

  useEffect(() => {
    if (exam_id) {
      fetchSet(exam_id);
    }
  }, []);


  const goHome = () => navigate(`/student/dashboard/exam/${exam_id}`);
  const goBack = () => navigate(-1);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isLoading) setLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      <div
        className={`fixed inset-0 duration-1000 bg-white z-[2000] flex items-center justify-center w-full
        ${
          loading || isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
        }
        `}
      >
        <ScaleLoader height={30} speedMultiplier={1.3} color="#9c29b2" />
      </div>
      {exam_id && (
        <AssessmentPage
          set_id={examSetResponse?.data?.id}
          studentName={
            (
              <span className="inline-block px-1 capitalize">
                {user?.user?.name}
              </span>
            ) as any
          }
          goBack={goBack}
          goHome={goHome}
          duration={120}
        />
      )}
    </div>
  );
}
