import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashLayout from "../../components/layouts/DashLayout";
import { MdOutlineArrowBack } from "react-icons/md";
import ComingUp from "../../components/dashboard/comingUp";
import MeetClass from "../../components/dashboard/meetClass";
import TopicComponent from "../../components/dashboard/topicComp";
import { useLazyGetSubjectQuery, useLazyGetSubjectLessonsQuery } from "../../services/api/subjectSlice";

const SubjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isBusy, setIsBusy] = useState(false)
  const [getSubject] = useLazyGetSubjectQuery();
  const [getSubjectLessons] = useLazyGetSubjectLessonsQuery();
  const [subject, setSubject] = useState<any>();
  const [subjectLessons, setSubjectLessons] = useState<any[]>([]);

  const loadSubject = async (id : any) => {
    await getSubject(id).then((response : any) => {
      setSubject(response.data.data);
    })
  }

  const loadSubjectLessons = async (id : any) => {
    setIsBusy(true)
    await getSubjectLessons(id).then((response : any) => {
      setSubjectLessons(response.data.data);
      setIsBusy(false)
    })
  }


  useEffect(()=>{
    loadSubject(id);
    loadSubjectLessons(id);
  },[]);

  return (
    <>
      <DashLayout>
        <div className="nue bg-[#FAFAFA] h-full pb-16">
          <div className="lg:flex justify-between pt-2 lg:pt-7 gap-x-8 lg:px-7">
            <div className="lg:w-[72%]">
              <div className="flex">
                <div className="flex items-center gap-x-3 cursor-pointer" onClick={() => navigate('/home')}>
                  <MdOutlineArrowBack className="text-4xl text-primary" />
                  <p className="text-2xl fw-600">Back</p>
                </div>
              </div>
              <div className="mt-4 lg:mt-8 flex items-center gap-x-3">
              {subject && (<>
                <img src="https://res.cloudinary.com/dic7regoe/image/upload/v1689279991/praxeum/image_14_jeqsjo.png" alt="subject" className="w-[100px] h-[100px] circle"/>
                <div>
                    <p className="text-[#FF006E] fw-600 text-xl lg:text-4xl">{subject.naming}</p>
                    <p className="text-[#1E1B1BB2] fw-600 lg:text-xl mt-1">{subject.description}</p>
                </div>
              </>)}
              </div>
              <div className="mt-6 lg:mt-10">
                <TopicComponent lessons={subjectLessons} busy={isBusy}/>
              </div>
            </div>
            <div className="lg:w-[28%] mt-6 lg:mt-0 px-2 lg:px-0">
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
