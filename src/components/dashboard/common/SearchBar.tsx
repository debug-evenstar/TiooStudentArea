import { CiSearch } from "react-icons/ci";

export interface SearchBarProps {
  value: string;
  style?: string;
  placeholder?: string;
  onChange: Function; 

}
export default function SearchBar({ value, onChange , style, placeholder }: SearchBarProps) {
  return (
    <div className={`w-full bg-white flex items-center justify-between border border-light shadow px-3 rounded-[22px] ${style ?? "py-4"}`}>
      <input
        className="outline-none  text-gray-600 px-3"
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />  
      <CiSearch className="text-2xl"/>
    </div>
  );
}
