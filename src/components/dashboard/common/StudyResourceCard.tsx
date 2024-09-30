import React from "react";

import robot from "../../../assets/icons/robot.svg";

interface StudyResourceProps {
  sections?: any[];
}

const StudyResourceCard: React.FC<StudyResourceProps> = ({ sections }) => {
  return (
    <div className="w-full mx-auto p-6 border border-gray-200 quicksand shadow  bg-white">
      {/* Title */}
      <h2 className="text-center text-lg font-semibold mb-4">RESOURCES</h2>
      <div className=" border-t border-black">
        {/* Icon and Divider */}
        <img src={robot} alt="" className="w-8 relative -top-4 mx-auto bg-white" />
      </div>

      <div className="py-20 flex items-center justify-center">
            <p>Coming soon</p>
          </div>
      {/* Sections */}
      {/* {sections?.map((section, index) => (
        <div key={index} className="mb-6">

          <h3 className="text-lg font-medium text-gray-600 mb-2">
            {section.title}
          </h3>

          {section.resources.map((resource: any, i: number) => (
            <div key={i} className="mb-3">
              <p className="text-sm text-gray-500">Tap to download</p>
              <a
                href={resource.link}
                className="text-primary text-[15.5px] font-medium"
                download
              >
                {resource.name}
              </a>
            </div>
          ))}


        </div>
      ))} */}
    </div>
  );
};

export default StudyResourceCard;
