import React from "react";

import robot from "../../../assets/icons/robot.svg";

interface StudyRelationsProps {
  items?: any[];
}

const StudyRelationsCard: React.FC<StudyRelationsProps> = ({ items }) => {
  return (
    <div className="mx-auto w-full p-6 border border-gray-200 quicksand shadow  bg-white">
      {/* Title */}
      <h2 className="text-center text-lg font-semibold mb-4">
        RELATED TEXTBOOKS
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
            <p>Coming soon</p>
          </div>

      {/* {items?.map((item: any, i: number) => (
        <div key={i} className="mb-3">
          <a
            href={item.link}
            className="text-primary mb-2 text-[15.5px] font-medium"
            download
          >
            {item.name}
          </a>
        </div>
      ))} */}

    </div>
  );
};

export default StudyRelationsCard;
