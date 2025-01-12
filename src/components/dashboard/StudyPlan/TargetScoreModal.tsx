import React, { useEffect, useRef, useState } from "react";
import ReactSlider from "react-slider";
import doneImg from "../../../assets/images/DoneButton.png";
import {
  studyPlanSlice,
  useSetTargetScoreMutation,
} from "../../../services/api/studyPlanSlice";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import { examsApiSlice } from "../../../services/api/examsSlice";

interface TargetScoreModalProps {
  isOpen: boolean;
  value: number | string | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (score: string) => void;
  maxScore?: number;
  setValue?: any;
}

const addScores = (payload: any) => {
  if (payload.length === 0) return null;
  return payload.reduce(
    (sum: any, current: any) => sum + current.target_score,
    0
  );
};

const reconvertToScores = (
  payload: { subject_id: string; target_score: number }[]
): { [subjectId: string]: number } => {
  return payload.reduce((acc, { subject_id, target_score }) => {
    acc[subject_id] = target_score;
    return acc;
  }, {} as { [subjectId: string]: number });
};

const TargetScoreModal: React.FC<TargetScoreModalProps> = ({
  isOpen,
  value,
  onOpenChange,
  onSubmit,
  maxScore = 100,
  setValue,
}) => {
  const [scores, setScores] = React.useState<{ [subjectId: number]: number }>(
    {}
  );

  const [visionStatement, setVisionStatement] = React.useState(""); // State for textarea
  const modalRef = useRef<HTMLDivElement>(null);
  const [setTargetScore] = useSetTargetScoreMutation();
  const [loading, setLoading] = useState(false);
  const { exam_id } = useParams();

  const accountExams = examsApiSlice.useGetAccountExamsQuery(null);
  const studyPlanRequest = studyPlanSlice.useGetStudyPlansQuery(null);

  const currentExam = accountExams?.data?.data.find(
    (e: any) => e.id == exam_id
  );
  const subjects = currentExam?.AccountExam.subjects ?? [];

  useEffect(() => {
    if (studyPlanRequest.data?.data) {
      const plan = studyPlanRequest.data.data.find(
        (p: any) => p.exam_id == exam_id
      );
      if (plan) {
        const targetScores = plan.target_scores;
        const visionStatement = plan.vision_statement;
        setScores(reconvertToScores(targetScores ?? []));
        setVisionStatement(visionStatement);
      } else {
        const initialScores = subjects.reduce((acc: any, subject: any) => {
          acc[subject.id] = maxScore / 2;
          return acc;
        }, {});
        setScores(initialScores);
      }
    }
  }, [studyPlanRequest.data]);

  useEffect(() => {}, [subjects, value, maxScore]);

  const handleSliderChange = (subjectId: number, newValue: number) => {
    setScores((prev) => ({ ...prev, [subjectId]: newValue }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const target_scores = Object.entries(scores).map(
        ([subjectId, target_score]) => ({
          subject_id: subjectId,
          target_score,
        })
      );
      const payload = {
        exam_id,
        target_scores,
        target_score: addScores(target_scores),
        vision_statement: visionStatement,
      };
      setValue(payload.target_score);
      const response = await setTargetScore(payload);
      if (!response.data.error) {
        toast.success("Scores and vision statement saved successfully!");
        studyPlanRequest.refetch();
        onOpenChange(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save data");
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  console.log(studyPlanRequest.data?.data);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4 overflow-hidden"
      >
        <div className="p-6 px-5 lg:px-12">
          <h2 className="text-xl text-center mb-2">Score Target</h2>
          <p className="text-center text-gray-600 mb-8">
            Choose your desirable score for each subject
          </p>

          <div className="grid grid-cols-2 gap-x-6">
            {subjects.map((subject: any, index: number) => (
              <div key={index} className="mb-5">
                <h3 className="text-lg text-gray-800 mb-1">{subject.name}</h3>
                <ReactSlider
                  className="w-full h-8"
                  thumbClassName="h-6 w-6 border border-primary bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 -mt-2"
                  trackClassName="h-2 bg-gray-200 rounded-full"
                  value={scores[subject.id] || 0}
                  onChange={(value) => handleSliderChange(subject.id, value)}
                  min={0}
                  max={maxScore}
                  renderTrack={(props: any, state: any) => (
                    <div
                      {...props}
                      key={subject.id + "_" + (index + 1)}
                      className={`h-2 rounded-full ${
                        state.index === 0 ? "bg-primary" : "bg-gray-200"
                      }`}
                    />
                  )}
                />
                <div className="flex justify-center">
                  <input
                    type="number"
                    value={scores[subject.id] || 0}
                    onChange={(e) =>
                      handleSliderChange(subject.id, Number(e.target.value))
                    }
                    min={0}
                    max={maxScore}
                    className="w-32 px-3 py-1 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Vision Statement Textarea */}
          <div className="">
            <label
              htmlFor="vision-statement"
              className="block text-lg text-gray-800 mb-2"
            >
              What is your vision statement
            </label>
            <textarea
              id="vision-statement"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              rows={4}
              placeholder="Write your vision statement here..."
              value={visionStatement}
              onChange={(e) => setVisionStatement(e.target.value)} // Update vision statement state
            ></textarea>
          </div>

          <div className="flex w-full mt-6">
            <button
              onClick={handleSubmit}
              className="mx-auto w-[14rem] relative"
            >
              {loading && (
                <div className="px-3 inset-0 absolute w-full flex items-center justify-center">
                  <PulseLoader
                    size={12}
                    className="bg-[#9c29b2] px-4 py-1"
                    color="white"
                  />
                </div>
              )}
              <img src={doneImg} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TargetScoreModal;
