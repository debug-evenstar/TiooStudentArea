import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import buttonImage from "../../../../assets/images/ToExamsButton.png";
import bookImage from "../../../../assets/images/bro.png";

export default function PracticeExam() {
  const navigate = useNavigate();

  const { exam_id } = useParams();


  const handleSkip = () => {
    navigate(`/student/dashboard/exam/${exam_id}`);
  }

  const handleContinue = () => {
    navigate(`/exams/assessment/${exam_id}`);
  }


  return (
    <div>
      <div className="p-6  mt-8 rounded-[12px] bg-white lg:pr-20 mb-6 w-full">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center urbanist text-[#9C29B2] gap-2 mb-6"
        >
          <BsArrowLeft size={20} color="#9C29B2" fontWeight={600} />
          <span className="text-[20px]">Previous</span>
        </button>
        <div className="flex text-gray-800 justify-center items-center flex-col pb-5 lg:pb-0 w-full">
          <h1 className="font-semibold text-4xl quicksand">
            Ready to write your mock exam?
          </h1>
          <p className="text-sm text-center urbanist mt-3">
            You need to dedicate 2 hours of your time for this UTME mock exam, <br/>so we can know
            your strengths and weaknesses to coach you better
            {/* You stopped at dividing the equation by 1, you can continue this
            lesson, <br/> or click on another lesson to get statrted */}
          </p>
        </div>
        <img src={bookImage} alt="" className="my-5 mt-10 w-[17rem] mx-auto"/>
        <div>
          <div className="mt-12 flex items-center justify-between">
            <button onClick={handleSkip} className="px-5 rounded-full border border-primary text-primary py-2">
              Skip
            </button>
            {/* <p></p> */}
            <button onClick={handleContinue}>
            <img src={buttonImage} alt="" className="w-[12rem]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
