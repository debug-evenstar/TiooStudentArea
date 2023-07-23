import React from "react";
import DashLayout from "../../components/layouts/DashLayout";
import ComingUp from "../../components/dashboard/comingUp";
import MeetClass from "../../components/dashboard/meetClass";
import SubjectContainer from "../../components/dashboard/subjectContainer";
import PostHeader from "../../components/index/PostHeader";

const DashboardHomePage = () => {
  
  return (
    <>
      <DashLayout>
        <div className="nue bg-[#FAFAFA] h-full pb-16">
          <PostHeader/>
          <div className="lg:flex justify-between mt-12 gap-x-8 lg:px-7">
            <div className="lg:w-[72%]">
              <SubjectContainer />
            </div>
            <div className="lg:w-[28%]">
              <div>
                <ComingUp />
              </div>
              <div className="mt-12">
                <MeetClass />
              </div>
            </div>
          </div>
        </div>
      </DashLayout>
    </>
  );
};

export default DashboardHomePage;
