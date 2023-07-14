import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
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
                <p className="text-[9px] text-[#FAB814] absolute -top-0">Coming soon</p>
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
          <img
            src="https://res.cloudinary.com/dic7regoe/image/upload/v1688584276/praxeum/Frame_1000004489_1_javpqm.png"
            alt="profile"
            className=""
          />
          <div>
            <p>Charity Ebuka</p>
            <p className="mt-1 fs-300 text-[#87909E]">Update profile</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
