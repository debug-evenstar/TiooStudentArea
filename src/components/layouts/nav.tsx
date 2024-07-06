import profilePic from '@/assets/images/profile-pic.png';
import { useSelector } from 'react-redux';
import {  useLocation } from 'react-router-dom';
import { selectUser } from '../../redux/reducers/userReducer';
import Notifications from "./notification";

export default function Nav({pages}: any) {
  const location = useLocation();


  const flat_pages = pages.flatMap((page: any) => page.submenu.length == 0? page: page.submenu);
  const currentPage = flat_pages.find((page: any) => page.route == location.pathname);

  const { user } = useSelector(selectUser);

  return (
    <div className="flex items-center border-b w-full justify-between px-6 py-6">
      <p className="font-[500] text-2xl">{ currentPage?.name ?? "Title"}</p>
      

      <div className="flex items-center space-x-4">
        <Notifications />
        <div className="flex items-center space-x-3">
          <img src={profilePic} alt="" className="w-[40px] h-[40px] rounded-full"/>
          <div className="text-sm">
            <p className="font-[500]">{user?.name}</p>
            <button className="font-[300]">logout</button>
          </div>
        </div>
      </div>
    </div>
  )
}