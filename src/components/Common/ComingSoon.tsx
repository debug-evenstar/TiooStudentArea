import { FaClock } from "react-icons/fa";

const ComingSoon = () => {
  return (
    <div className="flex items-center h-full w-full justify-center">
      <p className="px-20 py-10 text-gray-500 border rounded-full flex items-center space-x-2">
        <FaClock />
        <span>coming soon</span>
      </p>
    </div>
  );
};

export default ComingSoon;