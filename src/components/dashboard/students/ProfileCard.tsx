import profilePic from "@/assets/images/profile-pic.png";
import doodleImg from "@/assets/images/profile-card.png";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/reducers/userReducer";
import "animate.css";

const ProfileCard = () => {
  const { user } = useSelector(selectUser);

  const firstName = user?.name?.split(" ")[0];

  return (
    <div className="p-4 rounded-[16px] bg-[#50035E] w-full  sm:w-[55%] flex justify-between shrink-0">
      <div className="text-white flex flex-col space-y-3 shrink-0">
        <div className="flex items-center space-x-2">
          <img
            src={profilePic}
            alt=""
            className="w-[40px] h-[40px] rounded-full"
          />
          <p className="text-3xl font-[500]">
            Hi, {firstName} <span className="animate__animated animate__tada inline-block text-2xl animate__infinite">👋</span>
          </p>
        </div>
        <div className="flex justify-between space-x-4 mb-5">
        </div>
        {/* <p className="font-[300]">Flowinton Montessori School</p> */}
      </div>
      <img src={doodleImg} alt="" className=" shrink-0" />
    </div>
  );
};

export default ProfileCard;
