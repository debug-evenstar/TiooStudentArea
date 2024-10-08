import { useState } from "react";

const MultiSelectGroup = ({
  setAnswer,
  answer,
  options,
  max,
  activeSelection,
  setActiveSelection,
}: any) => {
  // const handleClick = (index: number) => {
  //   setActiveSelection(index);
  //   setAnswer(options[index]);
  // };

  const [selection, setSelection] = useState<number[]>([]);
  const isActive = (index: number) => selection.includes(index);

  const handleClick = (option: any, index: number) => {
    let data: number[] = [];
    if (!selection.includes(index)) {
      data = selection.length < max ? [...selection, index] : selection;
    } else {
      data = selection.filter((i) => i != index);
    }
    setSelection(data);
    const answers = data.map((i) => options[i]);
    setAnswer(answers);
    setActiveSelection && setActiveSelection(index);
  };

  return (
    <div className="flex gap-3 gap-y-5 flex-wrap">
      {options?.map((option: string, index: number) => (
        <button
          key={index}
          onClick={() => handleClick(option, index)}
          className={`p-3 py-2 border border-gray-300 active:ring ring-primary outline-none rounded-[12px] flex items-center space-x-3 ${
            isActive(index) && ""
          }`}
        >
          {isActive(index) ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 9L8 12L13 6M1 13.8V4.2C1 3.08 1 2.52 1.218 2.092C1.41 1.715 1.715 1.41 2.092 1.218C2.52 1 3.08 1 4.2 1H13.8C14.92 1 15.48 1 15.907 1.218C16.284 1.41 16.59 1.715 16.782 2.092C17 2.519 17 3.079 17 4.197V13.804C17 14.922 17 15.481 16.782 15.908C16.5899 16.2844 16.2836 16.5903 15.907 16.782C15.48 17 14.921 17 13.803 17H4.197C3.079 17 2.519 17 2.092 16.782C1.71569 16.5903 1.40974 16.2843 1.218 15.908C1 15.48 1 14.92 1 13.8Z"
                stroke="#9C29B2"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.28571 1H14.7143C15.3205 1 15.9019 1.24082 16.3305 1.66947C16.7592 2.09812 17 2.67951 17 3.28571V14.7143C17 15.3205 16.7592 15.9019 16.3305 16.3305C15.9019 16.7592 15.3205 17 14.7143 17H3.28571C2.67951 17 2.09812 16.7592 1.66947 16.3305C1.24082 15.9019 1 15.3205 1 14.7143V3.28571C1 2.67951 1.24082 2.09812 1.66947 1.66947C2.09812 1.24082 2.67951 1 3.28571 1Z"
                stroke="#DAD8FB"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          <span className="font-[500] text-[15px]">{option}</span>
        </button>
      ))}
    </div>
  );
};

export default MultiSelectGroup;
