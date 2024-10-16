import profilePic from "@/assets/images/profile-pic.png";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { selectUser } from "../../redux/reducers/userReducer";
import Notifications from "./notification";
// import { FaBars } from "react-icons/fa";
import SearchBar from "../dashboard/common/SearchBar";
import { useState } from "react";
import { logoutUser } from "../../utils/logout";
import { FaArrowLeft } from "react-icons/fa6";
import { HiBars3 } from "react-icons/hi2";

const Profile = ({ user }: { user: any }) => {
  return (
    <div className="flex items-center space-x-3">
      <img src={profilePic} alt="" className="w-[38px] h-[38px] rounded-full" />
      <div className="text-sm hidden sm:block">
        <p className="font-[500] capitalize">{user?.name}</p>
        <button onClick={logoutUser} className="font-[300]">
          logout
        </button>
      </div>
    </div>
  );
};

export default function Nav({ pages, hasBack, sideOpen, setSideOpen }: any) {
  const location = useLocation();

  const flat_pages = pages.flatMap((page: any) =>
    page.submenu.length == 0 ? page : page.submenu
  );
  const currentPage = flat_pages.find(
    (page: any) => page.route == location.pathname
  );

  const navigate = useNavigate();

  const { user } = useSelector(selectUser);

  const [search, setSearchValue] = useState("");
  const handleSearchChange = (e: any) => {
    setSearchValue(e.target.value);
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex items-center border-b w-full justify-between px-6 py-6 bg-white">
      {hasBack ? (
        <button
          onClick={goBack}
          className="flex outline-none items-center gap-3"
        >
          <FaArrowLeft /> <span className="text-xl">Back</span>
        </button>
      ) : (
        <div className="flex items-center gap-x-2">
          <button className="lg:hidden" onClick={() => setSideOpen(!sideOpen)}>
            <HiBars3 size={30} />
          </button>
          <p className="font-[500] text-2xl">
            {currentPage?.name ?? "Dashboard"}
          </p>
        </div>
      )}
      <SearchBar
        value={search}
        onChange={handleSearchChange}
        placeholder="Search on Tioo"
        style="w-[30rem] shadow-none py-3 hidden sm:flex;"
      />
      <div className="flex items-center space-x-4">
        <Notifications />
        <Profile user={user} />
      </div>
    </div>
  );
}
