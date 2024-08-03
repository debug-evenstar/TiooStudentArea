import React from "react";
import { useGetClassQuery } from "../../services/api/routineSlice";
import { DarkNameAvatar } from "../../utils/nameAvatar";

const MeetClass = () => {
  // const id = useAppSelector((state) => state.user.user.AccountId)
  const {data} = useGetClassQuery()
  
  return (
    <>
      <div className="">
        <div className="flex items-center justify-between pr-4">
          <p className="fw-600 text-lg">Meet Your Class</p>
          <div className="flex gap-x-2">
            {/* <img
              src="https://i.pravatar.cc/48?u=933372"
              alt="profile"
              className="w-12 h-12 circle"
            /> */}
            <div className="w-12 h-12">
                {data?.data?.class_teachers[0] && <DarkNameAvatar name={data?.data?.class_teachers[0]?.name}/>}
                </div>
            <div>
              <p className="fw-600 fs-500">{data?.data?.class_teachers[0]?.name}</p>
              <p className="fs-200 text-[#1E1B1BB2]">Class Teacher</p>
            </div>
          </div>
        </div>
        <div className="border-2 border-[#00000026] bg-white rounded-[8px] p-2 lg:px-4 py-4 mt-3">
          {data &&
            !!data?.data?.class_mates?.length &&
            data?.data?.class_mates?.map((item:any, index:number) => (
              <div className="flex items-center gap-x-3 mb-3" key={index}>
                {/* <img src={item.img} alt="profile" className="circle" /> */}
                {/* <NameAvatar name={item.name}/> */}
                <div className="w-12 h-12">
                <DarkNameAvatar name={item.name}/>
                </div>
                <div>
                  <p className="fw-600">{item.name}</p>
                  <p className="fs-300 text-[#4F46E5] fw-500">{item.flag}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default MeetClass;

