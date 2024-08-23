import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Profiles() {

  const navigate = useNavigate();

  const handleCreateProfile = () => {
    navigate('/parent/dashboard/profiles/create');
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center">
        <p className="font-[500] text-lg">Create A Profile</p>
        <p className="w-[70%] mx-auto text-sm">
          Create a different profile for each child to enjoy the best experience
          on Tioo
        </p>
        <button onClick={handleCreateProfile} className="w-[150px] h-[120px] mt-5 border flex flex-col mx-auto items-center justify-center rounded-[8px] bg-white text-gray-700">
          <span className="text-black font-[300] w-[24px] h-[24px] rounded-full border flex items-center justify-center">
            <FaPlus className="text-black"/>
          </span>
          <span>
            Add Profile
          </span>
        </button>
      </div>
    </div>
  );
}
