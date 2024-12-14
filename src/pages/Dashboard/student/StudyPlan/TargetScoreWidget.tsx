import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import trophyImg from "../../../../assets/images/tropy.svg";
import backImg from "../../../../assets/icons/back.svg";
import TargetScoreModal from "../../../../components/dashboard/StudyPlan/TargetScoreModal";
import { useSetTargetScoreMutation } from "../../../../services/api/studyPlanSlice";
import { toast } from "react-toastify";
import Confetti from "react-confetti-boom";
import { useNavigate } from "react-router-dom";

interface TargetScoreBoardProps {
  score: string;
  showConfetti: boolean;
}

const TargetScoreBoard: React.FC<TargetScoreBoardProps> = ({
  score,
  showConfetti,
}) => (
  <div className="relative px-4 pt-4 w-fit -mt-4 overflow-hidden">
    <div className="w-[200px] h-[109px] rounded-md bg-[#BA68C844] border-t p-1 border-primary">
      <div className="w-full h-full flex items-center justify-center flex-col rounded-md border border-r-2 border-b-2 border-[#BA68C877]">
        <p className="font-[500]">Target Score</p>
        <input
          type="number"
          readOnly
          value={score}
          min="400"
          max="400"
          className="w-[80%] py-2 text-black text-xl font-[600] text-center outline-none"
        />
      </div>
    </div>
    <img
      src={trophyImg}
      alt="Trophy"
      className="w-[180px] mx-auto -top-5 relative"
    />
    {showConfetti && (
      <Confetti
        shapeSize={7}
        mode="fall"
        colors={["#9C29B2", "#9C29B288", "#ff00ff"]}
        particleCount={250}
      />
    )}
  </div>
);

const TargetScoreWidget = ({ score, setScore }: any) => {
  const [modal, setModal] = useState(false);

  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {}, [score]);

  const handleSubmit = async (value: any) => {
    setShowConfetti(true);
  };

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  return (
    <>
      <TargetScoreModal
        onOpenChange={setModal}
        isOpen={modal}
        value={score}
        setValue={setScore}
        onSubmit={handleSubmit}
      />
      <div className="p-4 pb-0 bg-white lg:pr-20 mb-6 w-full">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center urbanist gap-2 mb-6"
        >
          <img src={backImg} alt="Back" className="w-6" />
          <span>Back</span>
        </button>
        <div className="flex justify-between flex-col pb-5 lg:pb-0 w-full lg:flex-row">
          <div className="flex order-2 lg:order-1 flex-col gap-y-1 pt-5">
            <h1 className="text-[22px] lg:text-[28px] font-[500]">
              Set your target score
            </h1>
            <p className="text-gray-500 urbanist">
              Choose the desirable score you wish to <br />
              achieve at the end of this examination
            </p>
            <button
              onClick={() => setModal(true)}
              className="border border-primary px-6 py-1 mt-2 text-primary font-bold urbanist rounded-md w-fit"
            >
              Set Score
            </button>
          </div>
          <div className="order-1 lg:order-2 w-fit mx-auto lg:mx-0">
            <TargetScoreBoard showConfetti={showConfetti} score={score} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TargetScoreWidget;
