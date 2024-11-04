import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import clockImg from "../../../../assets/images/clock.svg";
import trophyImg from "../../../../assets/images/tropy.svg";
import continueImg from "../../../../assets/images/ContinueButton.png";
import backImg from "../../../../assets/icons/back.svg";
import { FaPlus } from "react-icons/fa6";
import PlanItem from "./PlanItem";
import TargetScoreModal from "../../../../components/dashboard/StudyPlan/TargetScoreModal";
import { useSaveStudyPlanMutation, useSetTargetScoreMutation } from "../../../../services/api/studyPlanSclice";
import { toast } from "react-toastify";
import Confetti from "react-confetti-boom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../../../redux/reducers/userReducer";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const StudyPlanWidget  = ({score}: any) => {
  const { user } = useSelector(selectUser);
  const [ saveStudyPlan ] = useSaveStudyPlanMutation();
  const navigate = useNavigate();
  const [plans, setPlans] = useState(

    days.map((d, i) => ({
      day: d,
      ref: useRef<any>(),
    }))
  );


  const handleContinue = () => {
    // rapture all the schedules from the plans
    const schedules = plans.map((p) => p.ref.current?.getData());
    if(score == null || score == ''){
      toast.error("please select a target score");
      return;
    }
    saveStudyPlan({schedules})
      .then(response => {
        toast.success(response.data.message);    
        navigate('/student/dashboard/home');
      })
      .catch(error => toast.error(error));
  };

  return (
    <div className="flex flex-col p-4 bg-white">
      <div className="flex items-center gap-x-3 mb-7">
        <img src={clockImg} alt="Clock" />
        <div className="flex flex-col gap-y-1">
          <h1 className="text-[22px] lg:text-[28px] font-[500]">Set up your Learning Plans</h1>
          <p className="text-gray-500 urbanist">
            Personalize your learning plans
          </p>
        </div>
      </div>

      <div className="mt-7">
        {plans.map((plan, index) => (
          <PlanItem
            key={index}
            day={plan.day}
            ref={plan.ref}
            subjects={user?.metadata?.exam_data?.exam_subjects ?? []}
          />
        ))}
      </div>

      <div className="flex justify-end mt-7">
        <button onClick={handleContinue} className="active:scale-[0.98] outline-none">
          <img src={continueImg} alt="Continue" className="w-[9rem] lg:w-[12rem]" />
        </button>
      </div>
    </div>
  );
};

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

const TargetScoreWidget = ({score, setScore}: any) => {
  const [modal, setModal] = useState(false);

  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();
  const [setTargetScore] = useSetTargetScoreMutation();

  const handleSubmit = async (value: string) => {
    try {
      const response = await setTargetScore({ target_score: value }).unwrap();
      toast.success(response.data.message);
      setShowConfetti(true);
      setScore(value);
    } catch (error) {
      console.error(error);
    }
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
            <h1 className="text-[22px] lg:text-[28px] font-[500]">Set your target score</h1>
            <p className="text-gray-500 urbanist">
              Choose the desirable score you wish to <br/>achieve at the end of this
              examination
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

const StudyPlan: React.FC = () => {
  const [score, setScore] = useState("");
  return(
  <div className="outfit-font mt-8 pb-32">
    <TargetScoreWidget {...{score, setScore}} />
    <StudyPlanWidget score={score}/>
  </div>
)};

export default StudyPlan;
