import React, { useState } from "react";
import TargetScoreWidget from "./TargetScoreWidget";
import StudyPlanWidget from "./StudyPlanWidget";



const StudyPlan: React.FC = () => {
  const [score, setScore] = useState("");
  return (
    <div className="outfit-font mt-8 pb-32">
      <TargetScoreWidget {...{ score, setScore }} />
      <StudyPlanWidget score={score} setScore={setScore} />
    </div>
  );
};

export default StudyPlan;
