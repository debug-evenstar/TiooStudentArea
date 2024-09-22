import React, { useEffect, useState } from "react";

interface Option {
  id: string | number;
  name: string;
}

interface SelectDropdownProps {
  options: Option[]; // Update to accept array of objects with id and name
  placeholder?: string;
  searchHolder?: string;
  disabled?: boolean;
  onChange: (selectedOptions: Option[] | Option) => void;
  isMulti?: boolean;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  options,
  searchHolder,
  placeholder = "Select options",
  onChange,
  disabled,
  isMulti = true,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setSelectedOptions([]);
  },[disabled]);

  const toggleDropdown = () => !disabled && setIsDropdownOpen(!isDropdownOpen);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleOptionToggle = (option: Option) => {
    if (isMulti) {
      const isSelected = selectedOptions?.some((opt) => opt?.id === option?.id);
      let updatedOptions: Option[];

      if (isSelected) {
        updatedOptions = selectedOptions?.filter((opt) => opt?.id !== option?.id);
      } else {
        updatedOptions = [...selectedOptions, option];
      }

      setSelectedOptions(updatedOptions);
      onChange(updatedOptions);
    } else {
      setSelectedOptions([option]);
      onChange(option);
      setIsDropdownOpen(false); // Close dropdown after single selection
    }
  };

  const filteredOptions = options?.filter((option) =>
    option.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const displayText = isMulti
    ? selectedOptions?.length > 0
      ? selectedOptions?.map((opt) => opt?.name).join(", ")
      : placeholder
    : selectedOptions[0]?.name || placeholder;

  return (
    <div className="relative w-full sm:w-80">
      <button
        disabled={disabled}
        className={`w-full  border border-gray-300 rounded-md py-3 px-4 text-left flex justify-between items-center ${disabled ? "bg-gray-100":"bg-white"}`}
        onClick={toggleDropdown}
      >
        <span className="truncate text-sm urbanist text-gray-500">
          {displayText}
        </span>
        <span className="ml-2">
          <svg
            width="12"
            height="7"
            viewBox="0 0 12 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.99708 6.20042C5.53042 6.20042 5.06375 6.02042 4.71042 5.66708L0.36375 1.32042C0.170417 1.12708 0.170417 0.807083 0.36375 0.61375C0.557083 0.420417 0.877083 0.420417 1.07042 0.61375L5.41708 4.96042C5.73708 5.28042 6.25708 5.28042 6.57708 4.96042L10.9237 0.61375C11.1171 0.420417 11.4371 0.420417 11.6304 0.61375C11.8238 0.807083 11.8238 1.12708 11.6304 1.32042L7.28375 5.66708C6.93042 6.02042 6.46375 6.20042 5.99708 6.20042Z"
              fill="#8E92BC"
            />
          </svg>
        </span>
      </button>

      {isDropdownOpen && !disabled && (
        <div className="absolute z-10 right-0 p-3 text-sm urbanist bg-white w-10/12 border-gray-200 rounded-md mt-1 border">
          <input
            type="text"
            className="w-full border-b border-gray-300 py-1 outline-none"
            placeholder={searchHolder || "Search..."}
            value={searchText}
            onChange={handleSearchChange}
          />
          <ul className="max-h-72 overflow-auto py-2">
            {filteredOptions?.length > 0 ? (
              filteredOptions?.map((option) => (
                <li key={option?.id} className="py-1 text-[#1F3D4F] text-sm pr-1">
                  <label className="inline-flex cursor-pointer items-center justify-between w-full">
                    <span className="text-[14px]">{option.name}</span>
                    <input
                      type="radio"
                      className="form-checkbox h-4 w-4"
                      checked={selectedOptions?.some((opt) => opt?.id === option?.id)}
                      onChange={() => handleOptionToggle(option)}
                    />
                  </label>
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No options found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;
