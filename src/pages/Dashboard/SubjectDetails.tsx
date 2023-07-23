import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashLayout from "../../components/layouts/DashLayout";
import { MdOutlineArrowBack } from "react-icons/md";
import ComingUp from "../../components/dashboard/comingUp";
import MeetClass from "../../components/dashboard/meetClass";
import TopicComponent from "../../components/dashboard/topicComp";

const SubjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate()

  return (
    <>
      <DashLayout>
        <div className="nue bg-[#FAFAFA] h-full pb-16">
          <div className="lg:flex justify-between pt-7 gap-x-8 lg:px-7">
            <div className="lg:w-[72%]">
              <div className="flex">
                <div className="flex items-center gap-x-3" onClick={() => navigate(-1)}>
                  <MdOutlineArrowBack className="text-4xl text-primary" />
                  <p className="text-2xl fw-600">Back</p>
                </div>
              </div>
              <div className="mt-8 flex items-center gap-x-3">
                <img src="https://res.cloudinary.com/dic7regoe/image/upload/v1689279991/praxeum/image_14_jeqsjo.png" alt="subject" className="w-[100px] h-[100px] circle"/>
                <div>
                    <p className="text-[#FF006E] fw-600 text-xl lg:text-4xl">Basic Science</p>
                    <p className="text-[#1E1B1BB2] fw-600 lg:text-xl mt-1">Everything science, the environment, and phenomenon</p>
                </div>
              </div>
              <div className="mt-10">
                <TopicComponent/>
              </div>
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

export default SubjectDetails;
