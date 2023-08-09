import React from "react";
import DashLayout from "../../components/layouts/DashLayout";
import ComingUp from "../../components/dashboard/comingUp";
import MeetClass from "../../components/dashboard/meetClass";
import SubjectContainer from "../../components/dashboard/subjectContainer";
import PostHeader from "../../components/index/PostHeader";
import { useAppSelector } from "../../redux/store";
import { useNavigate } from "react-router-dom";

const DashboardHomePage = () => {
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate()
  return (
    <>
      <DashLayout>
        <div className={`nue h-full pb-16 ${user.school && 'bg-[#FAFAFA]'}`}>
          <PostHeader />
          {user.school && (
            <div className="lg:flex justify-between mt-6 lg:mt-12 gap-x-8 lg:px-7">
              <div className="lg:w-[72%] mb-8 lg:mb-0">
                <SubjectContainer />
              </div>
              <div className="lg:w-[28%]">
                <div className="px-2 lg:px-0">
                  <ComingUp />
                </div>
                <div className="mt-12 px-2 lg:px-0">
                  <MeetClass />
                </div>
              </div>
            </div>
          )}
          {
            !user.school && (
              <div className="mt-16 lg:mt-24 fw-600 bg-white text-center text-[#00000080]">
                  <p className="lg:text-2xl">Hi {user.name}</p>
                  <p className="lg:text-2xl">You haven&apos;t been added to a school yet</p>
                  <p className="lg:text-2xl">However, you can explore our library, choose a subject and start learning!</p>
                  <div className="flex justify-center mt-6">
                    <div className="w-[180px] bg-[#86A94B] text-center py-6 text-white text-xl fw-600 pr-2 poly cursor-pointer" onClick={() => navigate('/library')}>
                      Go To Library
                    </div>
                  </div>
              </div>
            )
          }
        </div>
      </DashLayout>
    </>
  );
};

export default DashboardHomePage;
