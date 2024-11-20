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
    <div className="p-4 rounded-[16px] bg-[#50035E] w-full overflow-hidden lg:w-[55%] flex justify-between">
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
          Welcome to Champion Tutorials!
          <br />
          <span className="inline-block mb-1">
            Join our WhatsApp study group to achieve a score of 300+ in your
            JAMB exam. Ask questions, share feedback, and make friends.
          </span>
          <a
            href="https://chat.whatsapp.com/KGjtTMbbwpRCIWzFrjKaAq"
            target="_blank"
            className="mt-2 bg-white text-black px-4 py-2 rounded-lg font-semibold inline-block"
          >
            WhatsApp Group
          </a>
          {/* <a href="https://chat.whatsapp.com/LXuTq372Pfy1M13uh0FZjG" target="_blank" className="mt-2 bg-white text-black px-4 py-2 rounded-lg font-semibold inline-block">
            WhatsApp Group
          </a> */}
        </p>
      </div>
      {/* <img src={doodleImg} alt="" className="sm:w-[8rem] h-auto" /> */}
    </div>
  );
};

export default ProfileCard;
