import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import NameAvatar from "../../../utils/nameAvatar";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { PiStudentBold } from 'react-icons/pi'
import { resetStateAction } from "../../../redux/actions/resetState";

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user.user);
  const logotUser = () => {
    dispatch(resetStateAction())
    navigate("/")
  }
  return (
    <>
      <div className="flex py-5 px-8 justify-between items-center bg-[#1E1B1B] text-white">
        <div className="flex items-center gap-x-6">
          <div>
            <p className="text-lg fw-600">LOGO</p>
          </div>
          <div>
            <ul className="flex items-center gap-x-4 mb-[2px]">
              <li className="">
                <NavLink to="/home">
                  {({ isActive, isPending }) => (
                    <span className={isActive ? "actives" : "p-[10px]"}>
                      Home
                    </span>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink to="/library">
                  {({ isActive, isPending }) => (
                    <span className={isActive ? "actives p-5" : "p-[10px]"}>
                      Library
                    </span>
                  )}
                </NavLink>
              </li>
              <li className="p-[10px] cursor-pointer relative">
                <p className="text-[9px] text-[#FAB814] absolute -top-0 px-[4px] rounded-lg border border-[#FAB81429] bg-[#FAB8140D]">
                  Coming soon
                </p>
                <p>Network</p>
              </li>
              <li>
                <NavLink to="/analytics">
                  {({ isActive, isPending }) => (
                    <span className={isActive ? "actives p-5" : "p-[10px]"}>
                      Analytics
                    </span>
                  )}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex gap-x-3 cursor-pointer">
          {/* <img
            src="https://res.cloudinary.com/dic7regoe/image/upload/v1688584276/praxeum/Frame_1000004489_1_javpqm.png"
            alt="profile"
            className=""
          /> */}
          <div className="w-12 h-12">
            <NameAvatar name={user.name} />
          </div>
          <Menu placement="bottom-start">
            <MenuHandler>
              <Button className="border-none px-0 bg-transparent shadow-none hover:shadow-none">
                <div>
                  <p className="capitalize nue">{user.name}</p>
                  <p className="mt-1 lowercase nue fs-300 text-[#87909E]">Update profile</p>
                </div>
              </Button>
            </MenuHandler>
            <MenuList className="w-16 bg-gray-100 fw-600 text-black">
              <MenuItem className="flex items-center gap-x-2"><PiStudentBold/>View Profile</MenuItem>
              <MenuItem className="flex items-center gap-x-2" onClick={logotUser}><RiLogoutCircleLine/>Log out</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </>
  );
};

export default Header;
