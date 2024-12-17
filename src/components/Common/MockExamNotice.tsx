
import { Checkbox } from "@material-tailwind/react";
import { useState, useEffect, ChangeEvent } from "react";
import { useExamNotice } from "../../hooks/useExamNotice";

const MockExamNotice = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { closeNotice } = useExamNotice();

  useEffect(() => {
      setIsVisible(true);
  }, []);

  const handleCloseBanner = () => {
      closeNotice();
      setIsVisible(false);
    setTimeout(() => {
      setShowBanner(false);
    }, 300);
  };


  return (
    <div
      className={`fixed inset-0 w-full p-4 flex backdrop-blur h-full z-[1000] justify-center items-center
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}
        transition-all duration-300 ease-in-out`}
    >
      <div className="bg-white shadow-lg rounded-lg p-5 w-full max-w-lg lg:max-w-md">
        <div className="flex justify-end">
          <button onClick={handleCloseBanner} className="text-3xl">&times;</button>
        </div>
        {/* <div className="flex flex-col gap-5"> */}
        <div className="flex flex-col gap-5 overflow-y-auto max-h-[34rem] lg:max-h-none">

          <div className="text-gray-800">
            <p className="font-bold text-lg lg:text-xl">
              You have to take a mock exam before you can continue with this lesson
            </p>
            <p className="mt-4">
              Please go to <span className="font-semibold">Dashboard</span> and click on  <span className="font-semibold">'Take mock exam' </span> 
              to start the assessment.
            </p>
          </div>
        </div>
        <div className="flex justify-end items-center mt-3">
          <button onClick={handleCloseBanner} className="bg-primary text-white px-4 py-2 rounded">
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

export default MockExamNotice;

