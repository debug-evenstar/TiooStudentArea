import React from "react";

import robot from "../../../assets/icons/robot.svg";

interface StudyCreditsProps {
  items?: any[];
}

const StudyCreditsCard: React.FC<StudyCreditsProps> = ({ items }) => {
  return (
    <div className="mx-auto w-full p-6 border border-gray-200 quicksand shadow  bg-white">
      {/* Title */}
      <h2 className="text-center text-lg font-semibold mb-4">CREDITS</h2>
      <div className=" border-t border-black">
        {/* Icon and Divider */}
        <img
          src={robot}
          alt=""
          className="w-8 relative -top-4 mx-auto bg-white"
        />
      </div>

      <div className="py-20 flex text-primary items-center justify-center">
        <p>Coming soon</p>
      </div>

      {/* {items?.map((item: any, i: number) => (
        <div key={i} className="mb-3 quicksand">
          <p className="text-gray-500 text-[15.5px] font-medium">
            {item.name} 
          </p>
          <p className="text-text-gray-700 text-[15.5px] font-medium">
            {item.role}
          </p>
        </div>
      ))} */}
    </div>
  );
};

export default StudyCreditsCard;
