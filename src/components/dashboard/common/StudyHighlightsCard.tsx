import React, { useState } from "react";

import robot from "../../../assets/icons/robot.svg";
import { BiChevronDown } from "react-icons/bi";

interface StudyHighlightProps {
  items?: any[];
}

const StudyHighlightCard: React.FC<StudyHighlightProps> = ({ items }) => {
  return (
    <div className="w-full p-6 pb-2 px-4 border border-gray-200 quicksand shadow  bg-white">
      {/* Title */}
      <h2 className="text-center text-lg font-semibold mb-4">
        TEXTBOOK HIGHTLIGHTS
      </h2>
      <div className=" border-t border-black">
        {/* Icon and Divider */}
        <img
          src={robot}
          alt=""
          className="w-8 relative -top-4 mx-auto bg-white"
        />
      </div>

      <div className="py-20 flex items-center justify-center">
        <p className="text-primary">Coming soon</p>
      </div>

    </div>
  );
};

export default StudyHighlightCard;
