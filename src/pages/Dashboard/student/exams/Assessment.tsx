import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AssessmentPage, ConfigureLibrary } from "@Praxeum-ai/LearnBlocks";
import { ScaleLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../redux/reducers/userReducer";
import { examsApiSlice } from "../../../../services/api/examsSlice";
import { useToken } from "../../../../hooks/useToken";

export default function Assessment() {
  const { exam_id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [fetchSet, { isLoading, data: examSetResponse }] =
    examsApiSlice.useLazyGetExamSetQuery();

  useEffect(() => {
    if (exam_id) {
      fetchSet(exam_id);
      const token = localStorage.getItem('token');
      ConfigureLibrary.save({
        baseUrl: import.meta.env.VITE_APP_API_BASE_URL,
        authType: "student",
        token: token ?? "",
      });
      setLoadingConfig(false);
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
          loading || isLoading || loadingConfig ? "opacity-100" : "opacity-0 pointer-events-none"
        }
        `}
      >
        <ScaleLoader height={30} speedMultiplier={1.3} color="#9c29b2" />
      </div>
      {exam_id && (
        <AssessmentPage
          examData={examSetResponse?.data}
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
