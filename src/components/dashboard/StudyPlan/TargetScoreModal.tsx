import React, { useEffect, useRef } from "react";
import ReactSlider from "react-slider";
import doneImg from "../../../assets/images/DoneButton.png";

interface TargetScoreModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (score: string) => void;
  maxScore?: number;
}

const TargetScoreModal: React.FC<TargetScoreModalProps> = ({
  isOpen,
  onOpenChange,
  onSubmit,
  maxScore = 400,
}) => {
  const [score, setScore] = React.useState<number | string>(maxScore / 2);
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onOpenChange(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onOpenChange]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onOpenChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty string to avoid the "0" issue
    if (value === "" || (!isNaN(Number(value)) && Number(value) >= 0 && Number(value) <= maxScore)) {
      setScore(value);
    }
  };

  const handleSliderChange = (value: number) => {
    setScore(value);
  };

  const handleSubmit = () => {
    onSubmit(`${score}`);
    onOpenChange(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg w-full max-w-sm mx-4 overflow-hidden"
      >
        <div className="p-6 px-12">
          <h2 className="text-xl text-center mb-2">Score Target</h2>

          <p className="text-center text-gray-600 mb-8">
            Choose your desirable score you wish to achieve at the end of this
            examination
          </p>

          <div className="mb-6">
            <ReactSlider
              className="w-full h-8"
              thumbClassName="h-6 w-6 border border-primary bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 -mt-2"
              trackClassName="h-2 bg-gray-200 rounded-full"
              value={typeof score === "number" ? score : Number(score) || 0}
              onChange={handleSliderChange}
              min={0}
              max={maxScore}
              renderTrack={(props: any, state: any) => (
                <div
                  {...props}
                  className={`h-2 rounded-full ${
                    state.index === 0 ? "bg-primary" : "bg-gray-200"
                  }`}
                />
              )}
            />

            <div className="flex justify-center mt-4">
              <input
                type="number"
                value={score}
                onChange={handleInputChange}
                min={0}
                max={maxScore}
                className="w-32 px-3 py-1 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>
          <div className="flex w-full">
            <button onClick={handleSubmit} className="mx-auto w-[14rem]">
              <img src={doneImg} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TargetScoreModal;
