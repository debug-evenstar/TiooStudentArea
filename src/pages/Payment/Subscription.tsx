

import { Outlet } from "react-router-dom";
import Nav, { SubNav } from "../../components/layouts/nav";
import { useState } from "react";
import { studentPages } from "../../constants/sidelinks";

const subjects = [
  { id: 1, name: "English Language" },
  { id: 2, name: "English Language" },
  { id: 3, name: "Mathematics" },
  { id: 4, name: "Physics" },
];

const mockExams = ["Mock Exams", "Mock Exams", "Mock Exams", "Mock Exams"];

function SubjectSelection() {
  const [selectedSubjects, setSelectedSubjects] = useState<any>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedMockExams, setSelectedMockExams] = useState<any>([]);

  const handleSubjectToggle = (subject: any) => {
    if (selectedSubjects.some((s: any) => s.id === subject.id)) {
      setSelectedSubjects((prev: any) => prev.filter((s: any) => s.id !== subject.id));
    } else {
      setSelectedSubjects((prev: any) => [...prev, subject]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedSubjects([]);
    } else {
      setSelectedSubjects(subjects);
    }
    setSelectAll(!selectAll);
  };

  const handleMockExamToggle = (index: any) => {
    if (selectedMockExams.includes(index)) {
      setSelectedMockExams((prev: any) => prev.filter((i: any) => i !== index));
    } else {
      setSelectedMockExams((prev: any) => [...prev, index]);
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Selection the subject to subscribe to!</h2>
      <div className="flex items-center gap-4 mb-6">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="accent-purple-500" />
          Term
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" className="accent-purple-500" />
          Monthly
        </label>
      </div>
      <div className="flex items-center justify-between mb-4">
        <span>Select all</span>
        <input
          type="checkbox"
          checked={selectAll}
          onChange={handleSelectAll}
          className="accent-purple-500"
        />
      </div>
      <div className="space-y-3">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className={`flex items-center justify-between border rounded-lg px-4 py-2 cursor-pointer ${
              selectedSubjects.some((s: any) => s.id === subject.id)
                ? "border-purple-500"
                : "border-gray-300"
            }`}
            onClick={() => handleSubjectToggle(subject)}
          >
            <span>{subject.name}</span>
            <input
              type="radio"
              checked={selectedSubjects.some((s: any) => s.id === subject.id)}
              readOnly
              className="accent-purple-500"
            />
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-3">Past Questions & Answers</h3>
        <div className="grid grid-cols-2 gap-4">
          {mockExams.map((exam, index) => (
            <label
              key={index}
              className="flex items-center gap-2 border rounded-lg px-4 py-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedMockExams.includes(index)}
                onChange={() => handleMockExamToggle(index)}
                className="accent-purple-500"
              />
              {exam}
            </label>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold">Selected Subjects</h3>
        <pre className="bg-gray-100 p-4 rounded mt-2">
          {JSON.stringify(selectedSubjects, null, 2)}
        </pre>
      </div>
    </div>
  );
}



export default function Subscription() {
  const [sideOpen, setSideOpen] = useState(false);

  return <SubjectSelection/>
  return (
    <div className="flex min-h-screen outfit-font bg-[#f9f7f3]">
      <main className="flex flex-col w-full">
        <SubNav generic pages={studentPages} {...{ sideOpen, setSideOpen }} />
        <div className="px-0 lg:px-20 relative w-full">
          <p className="quicksand font-[600] text-[24px] py-7 text-center">Your free session is over</p>
          <div className="grid grid-cols-2 quicksand">
            <div className="bg-white h-full rounded-[24px] py-5 px-3 lg:px-8">
              <p>Selection the subject to subscribe to!</p>
              <div className="flex items-center gap-7 mt-4">
                <label className="flex items-center">
                  <input className="mr-2" type="checkbox" />
                  <span className="text-sm">Term</span>
                </label>

                <label className="flex items-center">
                  <input className="mr-2" type="checkbox" />
                  <span className="text-sm">Monthly</span>
                </label>
              </div>
            </div>
            <div className="bg-white h-full rounded-[24px] ml-20 py-5 px-3 lg:px-5"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
