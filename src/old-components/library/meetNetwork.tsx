import React from "react";
import  { DarkNameAvatar } from "../../utils/nameAvatar";
import { useGetNetworkQuery } from "../../services/api/librarySlice";

const MeetNetwork = () => {
  const {data, isLoading:loading} = useGetNetworkQuery()
  
  return (
    <>
      <div className="">
        <div className="flex items-center justify-between pr-4">
          <p className="fw-600 text-lg">Meet Your Network</p>
        </div>
        <div className="border-2 border-[#00000026] bg-white rounded-[8px] p-2 lg:px-4 py-4 mt-3">
          {data &&
            !!data?.data?.length &&
            data?.data?.map((item:any, index:number) => (
              <div className="flex items-center gap-x-3 mb-3" key={index}>
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

export default MeetNetwork;

