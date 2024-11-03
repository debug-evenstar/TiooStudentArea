import React, { useEffect, useState, FC } from "react";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import { FaPlus } from "react-icons/fa6";

export interface PlanItemProps {
  day: string;
  subjects: string[];
  onChange?: any;
}

export interface ScheduleItemProps {
  subject: string;
  index: number;
  onRemove: (subject: string) => void;
  start_time?: string;
  end_time?: string;
  setTime: (name: string, subject: string, time: string) => void;
}

interface TimeSelectProps {
  name: string;
  onChange: (value: any) => void;
  value?: string;
}

const TimeSelect: FC<TimeSelectProps> = ({ name, onChange, value }) => (
  <TimePicker
    className="w-[5rem] border-gray-400 border rounded font-semibold cursor-pointer outline-none"
    onChange={onChange}
    use12Hours
    showSecond={false}
    placeholder={name}
  />
);

const RemoveIcon = () => (
  <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2 18L17.92 2M18 18L2.08 2"
      stroke="#454545"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SubjectScheduleItem: FC<ScheduleItemProps> = ({
  subject,
  start_time,
  end_time,
  index,
  onRemove,
  setTime,
}) => (
  <div className="flex mb-3">
    <button className="mt-3 h-fit w-fit" onClick={() => onRemove(subject)}>
      <RemoveIcon />
    </button>
    <div className="border-b border-gray-400 ml-5 w-full">
      <div className="mb-3 mt-1 flex items-start gap-2 lg:gap-0 lg:items-center lg:flex-row flex-col justify-between">
        <span className="text-gray-600 inline-block outline-none font-semibold">
          {subject}
        </span>
        <div className="flex gap-3 items-center">
          <TimeSelect
            onChange={(value) =>
              setTime("start_time", subject, value && value.format("hh:mm A"))
            }
            name="Start Time"
            value={start_time}
          />
          <TimeSelect
            onChange={(value) =>
              setTime("end_time", subject, value && value.format("hh:mm A"))
            }
            name="End Time"
            value={end_time}
          />
        </div>
      </div>
    </div>
  </div>
);

const PlanItem = React.forwardRef(({ day, subjects,onChange }: PlanItemProps, ref) => {
  const [schedules, setSchedules] = useState<ScheduleItemProps[]>([]);
  const [open, setOpen] = useState(false);

  const handleRemoval = (subject: string) => {
    setSchedules((prev) => prev.filter((s) => s.subject !== subject));
  };

  const setTime = (name: string, subject: string, time: string) => {
    onChange();
    setSchedules((prevSchedules) =>
      prevSchedules.map((s) =>
        s.subject === subject ? { ...s, [name]: time } : s
      )
    );
  };

  const addSchedule = () => {
    const existingSubjects = schedules.map((s) => s.subject);
    const newSubject = subjects.find(
      (subject) => !existingSubjects.includes(subject)
    );

    if (newSubject) {
      setSchedules((prev) => [
        ...prev,
        {
          subject: newSubject,
          index: prev.length,
          onRemove: handleRemoval,
          setTime: setTime,
        },
      ]);
    }
  };

  React.useImperativeHandle(ref, () => ({
    getData: () => {
      return {
        day: day,
        schedules: schedules.filter((s) => (s.end_time !== null ) && (s.start_time != null))
      }
    }
  }));

  useEffect(() => {
    const initialSchedules = subjects.map((subject, index) => ({
      index,
      subject,
      onRemove: handleRemoval,
      setTime: setTime,
    }));
    setSchedules(initialSchedules);
    setOpen(day === "Monday");
  }, [subjects]);

  return (
    <div className="border sm:p-3 rounded-lg urbanist mb-3">
      <div className="flex items-center py-2 bg-primary/25 rounded-t-lg justify-between pl-3 lg:pl-8 pr-4 ">
        <h2 className="font-semibold text-[18px] lg:text-[20px] capitalize">{day}</h2>
        <div className="flex items-center gap-x-3">
          <button
            className={!open ? "" : "rotate-180"}
            onClick={() => setOpen(!open)}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 12.0001C24 12.0001 18.1081 20 15.9999 20C13.8918 20 8 12 8 12"
                stroke="#14181F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="py-3 px-2">
          <ul>
            {schedules.map((sched) => (
              <li key={sched.index}>
                <SubjectScheduleItem {...sched} />
              </li>
            ))}
          </ul>
          <div className="mt-3">
            {schedules.length < subjects.length && (
              <button
                onClick={addSchedule}
                className="bg-[#9C29B233]  border-primary px-5 text-lg border flex items-center urbanist text-primary py-2 rounded-md"
              >
                <FaPlus />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

export default PlanItem;
