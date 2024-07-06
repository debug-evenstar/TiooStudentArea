import { CiSearch } from "react-icons/ci";

export interface SearchBarProps {
  value: string;
  style?: string;
  placeholder?: string;
  onChange: Function; 

}
export default function SearchBar({ value, onChange , style, placeholder }: SearchBarProps) {
  return (
    <div className={`w-full flex items-center justify-between border border-light shadow py-4 px-3 rounded-[22px] ${style}`}>
      <input
        className="outline-none text-gray-600 px-3"
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      <CiSearch className="text-2xl"/>
    </div>
  );
}
