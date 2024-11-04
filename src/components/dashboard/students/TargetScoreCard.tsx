import React from "react";
import ReactSlider from "react-slider";
import trophyImg from "../../../assets/images/trophy-gold.png";
import { Link } from "react-router-dom";

const TargetScoreCard = ({ targetScore = 0 }: any) => {
  const targetPercentage = (targetScore / 400) * 100;

  return (
    <div className="bg-[#334E3E] p-6 rounded-[16px] lg:w-[40%] w-full justify-between text-white flex items-center">
      <div className="flex flex-col items-start">
        <div>
          <div className="quicksand font-semibold flex items-center ">
            <span className="text-[30px] font-[500]">Target Score</span>
            <div className="ml-4 border urbanist shadow-lg shadow-inner-lg text-[#FFB74D] flex items-center justify-center text-[16px] font-bold border-gray-600 rounded-full w-10 h-10">
              {targetScore}
            </div>
          </div>
          <div className="text-[#87909E] ">In Progress</div>
          <div className="flex items-center justify-between w-full mt-2">
            <ReactSlider
              className="w-10/12 h-8"
              thumbClassName="h-4 w-4 border shrink-0  bg-[#4285F4] bg-white outline-none shadow-md rounded-full -mt-1"
              trackClassName="h-2 bg-gray-200 rounded-full"
              value={0}
              min={0}
              max={400}
              renderTrack={(props: any, state: any) => (
                <div className="relative ">
                  <div
                    style={{ left: `${targetPercentage}%` }}
                    className="h-5 -mt-1.5  absolute bg-[#FFB74D] w-[2px]"
                  />
                  <div
                    {...props}
                    className={`h-2 rounded-full ${
                      state.index === 0 ? "bg-[#4285F4]" : "bg-gray-200"
                    }`}
                  />
                </div>
              )}
            />
          </div>
        </div>
        {targetScore == 0 && (
          <Link to='/student/dashboard/onboarding/study-plan'>
            <button className="bg-white text-black px-4 py-2 rounded-lg font-semibold mt-4">
              Set target score
            </button>
          </Link>
        )}
      </div>

      <div className="ml-4">
        <img src={trophyImg} alt="Trophy Icon" className="w-20" />
      </div>
    </div>
  );
};

export default TargetScoreCard;
