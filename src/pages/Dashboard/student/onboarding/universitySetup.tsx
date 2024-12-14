import React, { useEffect, useState } from "react";
import MultiSelectGroup from "../../../../components/Common/MultiItemSelect";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { dashboardApiSlice } from "../../../../services/api/dashboardSlice";
import { DotLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setExamFlag, toggleSidebarReload } from "../../../../redux/reducers/sidebarReducer";
import {
  selectExamData,
  setUserExamData,
  setUserMetaData,
} from "../../../../redux/reducers/userReducer";
import { RootState } from "@reduxjs/toolkit/query";
import { examsApiSlice } from "../../../../services/api/examsSlice";
import MultiSelectExt from "../../../../components/Common/MultiItemSelectExt";

const ExamCard = ({color,name,image_path}: any) => {
  return (
    <div
      className="rounded-[20px] px-2 py-3 cursor-pointer flex justify-between items-center pr-10"
      style={{ backgroundColor: color ?? "#17C880" }}
    >
      <div className="flex gap-3">
        <div className="w-[7rem] p-2 rounded-[20px] bg-white">
          <img src={image_path} alt="" className="w-full" />
        </div>
        <div className="flex flex-col py-4 justify-between">
          <p className="font-bold text-lg text-white">{name}</p>
          <div className="flex text-white items-center gap-x-10 mr-10 justify-between">
            Examination
          </div>
        </div>
      </div>
      <div>
        <img src="/images/Group 26.svg" alt="" className="w-52" />
      </div>
    </div>
  );
};

const SearchBar = ({
  value,
  setValue,
  placeholder = "Search your course",
}: any) => {
  const handleChange = (e: any) => {
    const value = e.currentTarget.value;
    setValue(value);
  };

  return (
    <div className="rounded-full py-2 flex w-fit items-center gap-3 px-6 mt-5 border border-gray-300">
      <input
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        className="lg:w-[21rem] text-gray-700 outline-none"
      />
      <span>
        <FaMagnifyingGlass />
      </span>
    </div>
  );
};

export default function UniversitySetup() {


  const [canProceed, setCanProceed] = useState(false);
  const [exams, setExams] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { uni_id } = useParams();

  const [registerExams, { isLoading }] = examsApiSlice.useRegisterExamsMutation();


  const { data: examData , isLoading: examIsLoading} = examsApiSlice.useGetUniversityQuery(uni_id);


  const  location  = useLocation();

  const color = location?.state?.color;

  const userMeta = useSelector(selectExamData);

  useEffect(() => {
    if (userMeta) {
      // setExams(
      //   userMeta.exam_exams?.filter((s: string) => options.includes(s))
      // );
    }
  }, [userMeta]);

  useEffect(() => {
    setCanProceed(exams.length > 0);
  }, [exams]);

  const examOptions = examData?.data?.exams?.map((e: any) => ( {name: e.name, id: e.id}));

  // Filter options based on search input
  const filteredOptions = examOptions?.filter((exam: any) =>
    exam.name.toLowerCase().includes(search.toLowerCase())
  );
  const payload = {
    exams
  }
  const handleContinue = () => {
    registerExams(payload).then((response: any) => {
      if (response.data && response.data.error == false) {
        toast.success("Saved");
        // dispatch(setUserExamData(exam_data));
        dispatch(toggleSidebarReload());
        setTimeout(() => {
          dispatch(setExamFlag(true));
        }, 1000);
        navigate("/student/dashboard");
      }
    });
  };


  return (
    <div className="mt-7">
      <div className="">
        <ExamCard color={color} name={examData?.data?.name} image_path={examData?.data.image_path} />
      </div>
      <div className="bg-white quicksand rounded-[20px] px-3 lg:px-16 py-6 mt-10">
        <p className="text-xl lg:text-2xl font-semibold">
          Select your exams
        </p>
        <SearchBar value={search} setValue={setSearch} />
        <div className="mt-8">
          <MultiSelectExt
            max={4}
            options={filteredOptions}
            values={exams ?? []}
            ext={true}
            setAnswer={(value: any) => setExams(value)}
          />
        </div>
        <div className="mt-8 flex justify-end">
          <button
            disabled={!canProceed}
            onClick={handleContinue}
            className={`px-5 py-2 rounded-full flex gap-2 items-center font-bold text-base ${
              canProceed ? "bg-primary text-white" : "bg-gray-300 text-gray-800"
            }`}
          >
            <span>continue</span>
            {isLoading && (
              <DotLoader color="white" size={12} className="w-[1.2rem] ml-2" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
