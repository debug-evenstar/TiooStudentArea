import React from "react";
import { useGetClassQuery } from "../../services/api/routineSlice";

const MeetClass = () => {
  const {data} = useGetClassQuery()
  return (
    <>
      <div className="">
        <div className="flex items-center justify-between pr-4">
          <p className="fw-600 text-lg">Meet Your Class</p>
          <div className="flex gap-x-2">
            <img
              src="https://i.pravatar.cc/48?u=933372"
              alt="profile"
              className="w-12 h-12 circle"
            />
            <div>
              <p className="fw-600 fs-500">Ekemini Etim</p>
              <p className="fs-200 text-[#1E1B1BB2]">Class Teacher</p>
            </div>
          </div>
        </div>
        <div className="border-2 border-[#00000026] bg-white rounded p-2 lg:px-4 py-4 mt-3">
          {classes &&
            !!classes.length &&
            classes.map((item, index) => (
              <div className="flex items-center gap-x-2 mb-3">
                <img src={item.img} alt="profile" className="circle" />
                <div>
                  <p className="fw-600">{item.name}</p>
                  <p className="fs-300 text-[#1E1B1BB2] fw-500">{item.class}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default MeetClass;

const classes = [
  {
    name: "Anita Sampson",
    img: "https://i.pravatar.cc/48?u=933374",
    class: "Primary 5",
  },
  {
    name: "Philip Monsfe",
    img: "https://i.pravatar.cc/48?u=933324",
    class: "Primary 5",
  },
  {
    name: "Kareem Lateef",
    img: "https://i.pravatar.cc/48?u=933334",
    class: "Primary 5",
  },
  {
    name: "Ghost Mobalig",
    img: "https://i.pravatar.cc/48?u=933309",
    class: "Primary 5",
  },
  {
    name: "Benita Gamba",
    img: "https://i.pravatar.cc/48?u=933334",
    class: "Primary 5",
  },
  {
    name: "Labnas Notreak",
    img: "https://i.pravatar.cc/48?u=933394",
    class: "Primary 5",
  },
  {
    name: "Philip Monsfe",
    img: "https://i.pravatar.cc/48?u=933306",
    class: "Primary 5",
  },
];
