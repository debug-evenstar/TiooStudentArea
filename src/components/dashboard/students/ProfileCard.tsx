import profilePic from "@/assets/images/profile-pic.png";
import doodleImg from "@/assets/images/profile-card.png";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/reducers/userReducer";
import "animate.css";

const ProfileCard = () => {
  const { user } = useSelector(selectUser);

  const name = user?.name?.split(" ");
  let firstName;

  if (name.length == 2) firstName = name[0];
  else firstName = name.slice(0, 2).join(" ");

  return (
    <div className="p-4 rounded-[16px] bg-[#50035E] w-full overflow-hidden lg:w-[60%] flex justify-between">
      <div className="text-white flex flex-col gap-y-3 w-full">
        <div className="flex items-center space-x-2">
          <img
            src={profilePic}
            alt=""
            className="w-[40px] h-[40px] rounded-full"
          />
          <p className="text-3xl font-[500] capitalize">
            Hi, {firstName}{" "}
            <span className="animate__animated animate__tada inline-block text-2xl animate__infinite">
              👋
            </span>
          </p>
        </div>
        <p className="w-full relative leading-[1.2rem] text-[15px]">
          Welcome to JAMB Tioo!<br/>
          <span className="inline-block mb-1">
          I'm Timothy Icon, your JAMB coach. Join our WhatsApp study group to achieve a score of 280+ in your JAMB exam.
          Ask questions, share feedback, and make friends.
          </span>
          <a href="https://chat.whatsapp.com/LXuTq372Pfy1M13uh0FZjG" target="_blank" className="mt-2 px-2 py-1 text-sm rounded bg-white text-gray-800 inline-block">
            WhatsApp Group
          </a>
          
          {/* I'm Timothy Icon the moderator of JAMB Tioo. My goal is to help you pass your JAMB exam with at least 280 score. */}
          {/* join our study group on WhatsApp and feel free to ask for help and provide any feedback on how we can improve the platform! */}
        </p>
        {/* <div className="flex justify-between space-x-4 mb-5"></div> */}
        {/* <p className="font-[300]">Flowinton Montessori School</p> */}
      </div>
      {/* <img src={doodleImg} alt="" className="sm:w-[8rem] h-auto" /> */}
    </div>
  );
};

export default ProfileCard;
