import { useEffect, useRef, useState } from "react";
import clockImg from "../../../../assets/images/clock.svg";
import continueImg from "../../../../assets/images/ContinueButton.png";
import continueLightImg from "../../../../assets/images/ContinueButtonLight.png";
import PlanItem from "./PlanItem";
import { useSaveStudyPlanMutation } from "../../../../services/api/studyPlanSlice";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectStudyPlan,
  selectUser,
  setUserStudyPlan,
} from "../../../../redux/reducers/userReducer";
import ConfirmationModal from "../../../../components/dashboard/StudyPlan/ConfirmationModal";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const StudyPlanWidget = ({ score, setScore }: any) => {
  const { user } = useSelector(selectUser);
  const [saveStudyPlan] = useSaveStudyPlanMutation();

  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);

  const [continueActive, setContinueActive] = useState(false);

  const userStudyPlan = useSelector(selectStudyPlan);

  const dispatch = useDispatch();

  useEffect(() => {
    setScore(userStudyPlan?.target_score ?? 0);
  }, []);

  const [plans] = useState(
    days.map((d, i) => ({
      day: d,
      ref: useRef<any>(),
    }))
  );

  useEffect(() => {
    // trying to restore from the saved data
    // loop true the chosen ones and update the schedules respectively
    const data = userStudyPlan?.data ?? [];
    let changed = false;
    if (Array.isArray(data)) {
      data.forEach((p: any) => {
        const target = plans.find((planItem) => planItem.day == p.day);
        if (target) {
          target.ref.current?.updateSchedules(p.schedules);
          changed = true;
        }
      });
    }

    if (changed) {
      setContinueActive(true);
    }
  }, [userStudyPlan]);

  const handleContinue = () => {
    // rapture all the schedules from the plans
    const plansData = plans.map((p) => p.ref.current?.getData());
    if (score == null || score == "") {
      toast.error("please select a target score");
      return;
    }

    const payload = { schedule: plansData.filter((s) => s.schedules.length) };

    if (payload.schedule.length == 0) {
      toast.error("please set at least one study plan");
      return;
    }

    if (payload.schedule.length < 7 && !showConfirm) {
      setShowConfirm(true);
      return;
    }

    saveStudyPlan(payload)
      .then((response) => {
        toast.success(response.data.message);
        dispatch(setUserStudyPlan(response.data.data));
        navigate("/student/dashboard/home");
      })
      .catch((error) => toast.error(error))
      .finally(() => setShowConfirm(false));
  };

  const onChange = () => {
    const schedules = plans.map((p) => p.ref.current?.getData());
    const validSchedules = schedules.filter((s) => s.schedules.length);
    if (validSchedules.length) {
      setContinueActive(true);
    } else {
      setContinueActive(false);
    }
  };

  const replicate = (schedules: any, day: string) => {
    plans.forEach((p) => {
      if (p.day != day) p.ref.current?.updateSchedules(schedules);
    });
  };

  return (
    <>
      <ConfirmationModal
        onOpenChange={setShowConfirm}
        isOpen={showConfirm}
        onConfirm={handleContinue}
      />
      <div className="flex flex-col p-4 bg-white">
        <div className="flex items-center gap-x-3 mb-7">
          <img src={clockImg} alt="Clock" />
          <div className="flex flex-col gap-y-1">
            <h1 className="text-[22px] lg:text-[28px] font-[500]">
              Create your study timetable
            </h1>
            <p className="text-gray-500 urbanist">Personalize your learning</p>
          </div>
        </div>

        <div className="mt-7">
          {plans.map((plan, index) => (
            <PlanItem
              key={index}
              day={plan.day}
              ref={plan.ref}
              replicate={replicate}
              onChange={onChange}
              subjects={user?.metadata?.exam_data?.exam_subjects ?? []}
            />
          ))}
        </div>

        <div className="flex justify-end mt-7">
          <button
            // disabled={!continueActive}
            onClick={handleContinue}
            className={`active:scale-[0.98] outline-none ${
              continueActive ? "cursor-pointer" : "cursor-not-allowed"
            }`}
          >
            <img
              src={continueActive && score ? continueImg : continueLightImg}
              alt="Continue"
              className="w-[9rem] lg:w-[12rem]"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default StudyPlanWidget;
