import React, { useEffect, useState } from "react";
import SelectDropdown from "../../../../components/dashboard/common/SelectDropdown";
import { subjectApiSlice } from "../../../../services/api/subjectSlice";

export default function Curator() {
  const [canCurate, setCanCurate] = useState(false);
  const [subject, setSubject] = useState<any>(null);
  const [subjects, setSubjects] = useState<any>([]);
  const [topic, setTopic] = useState<any>(null);
  const [books, setBooks] = useState<any[] | null>(null);
  useEffect(() => {
    setCanCurate(!!(subject && topic));
  }, [subject, topic]);

  const handleSubjectSelect = (subject: any) => {
    setTopic(null)
    setSubject(subject);
    console.log(subject);
  };

  const handleTopicSelect = (topic: any) => {
    setTopic(topic);
  };

  const { data } = subjectApiSlice.useGetSubjectsWithTopicsQuery();

  useEffect(() =>{
    setSubjects(data?.data);
  },[data]);


  
  return (
    <div className="pt-5 w-fit">
      <h1 className="font-[500] text-[30px] quicksand text-[#1F3D4F]">
        Curate Past Questions
      </h1>
      <p className="text-[#2422208F] text-[18px] urbanist">
        This feature allows you curate past questions from different years under
        different topics
      </p>
      <div className=" w-full p-5 sm:w-fit mt-4 bg-white rounded-lg shadow">
        <div className=" flex flex-col sm:flex-row gap-x-12 gap-y-3">
          <div className="py-3" >
            <label className="text-sm font-[400] urbanist mb-2 inline-block">
              Select Subject
            </label>
            <SelectDropdown
              placeholder="Choose the subject you want to curate past questions for"
              searchHolder="Search subject"
              onChange={handleSubjectSelect}
              isMulti={false}
              options={subjects ?? []}
            />
          </div>
          <div className="py-3" >
            <label className="text-sm font-[400] urbanist mb-2 inline-block">
              Select Topic
            </label>
            <SelectDropdown
              placeholder="Choose the topic you want to curate past questions for"
              searchHolder="Search topic"
              onChange={handleTopicSelect}
              isMulti={false}
              disabled={!subject || subject.Topics.length == 0}
              options={subject?.Topics ?? []}
            />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            disabled={!canCurate}
            className={`py-1.5 px-10 rounded-full text-sm
              ${
                canCurate
                  ? "bg-primary text-white active:scale-95 active:ring-1"
                  : "bg-[#E4E4E4] text-gray-600"
              }
            `}
          >
            Curate
          </button>
        </div>
      </div>

      <div className="mt-5 min-h-[16rem] flex items-center urbanist text-[#1F3D4F] justify-center">
        {books == null && <p>No past question curated yet</p> }
        {books && <></>}
      </div>
    </div>
  );
}
