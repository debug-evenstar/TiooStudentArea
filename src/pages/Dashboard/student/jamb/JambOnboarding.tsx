import React, { useEffect, useState } from "react";
import MultiSelectGroup from "../../../../components/Common/MultiItemSelect";
import { FaMagnifyingGlass } from "react-icons/fa6";

const ExamCard = () => {
  return (
    <div
      className="rounded-[20px] px-2 py-3 cursor-pointer flex justify-between items-center pr-10"
      style={{ backgroundColor: "#17C880" }}
    >
      <div className="flex gap-3">
        <div className="w-[7rem] p-2 rounded-[20px] bg-white">
          <img src={"/images/exams/jamb.png"} alt="" className="w-full" />
        </div>
        <div className="flex flex-col py-4 justify-between">
          <p className="font-bold text-lg text-white">JAMB/UTME</p>
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

const SearchBar = ({ value, setValue, placeholder = "Search your course" }: any) => {
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
        className="w-[21rem] text-gray-700 outline-none"
      />
      <span>
        <FaMagnifyingGlass />
      </span>
    </div>
  );
};

export default function JambOnboarding() {
  const options = [
    "English",
    "Music",
    "Arts",
    "Biology",
    "Mathematics",
    "Agricultural Science",
    "Chemistry",
    "Geography",
    "Literature",
    "Civic Education",
    "Physics",
    "Economics",
  ];

  const [canProceed, setCanProceed] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setCanProceed(subjects.length === 4);
  }, [subjects]);

  // Filter options based on search input
  const filteredOptions = options.filter((subject) =>
    subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-7">
      <div className="">
        <ExamCard />
      </div>
      <div className="bg-white quicksand rounded-[20px] px-16 py-6 mt-10">
        <p className="text-2xl font-semibold">Select your course combination</p>
        <SearchBar value={search} setValue={setSearch} />
        <div className="mt-8">
          <MultiSelectGroup
            max={4}
            options={filteredOptions}
            setAnswer={(value: any) => setSubjects(value)}
          />
        </div>
        <div className="mt-8 flex justify-end">
          <button
            className={`px-5 py-2 rounded-full font-bold text-base ${
              canProceed ? "bg-primary text-white" : "bg-gray-300 text-gray-800"
            }`}
          >
            continue
          </button>
        </div>
      </div>
    </div>
  );
}
