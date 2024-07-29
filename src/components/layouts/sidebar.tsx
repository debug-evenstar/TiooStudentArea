import logoImg from "@/assets/logo.png";
import { FC, useState } from "react";
import { FaX } from "react-icons/fa6";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link, NavLink, useLocation } from "react-router-dom";

const SubMenuItem = ({ name, route }: any) => {
  const location = useLocation();
  const isActive = location.pathname == route;
  return (
    <li className=" mt-3 border-l -left-[1px] relative border-b-2 rounded-[10px] overflow w-[90%]">
      <Link className="text-gray-600" to={route}>
        <div
          className={`relative py-2 px-4 left-3 top-4  rounded-[5px]  ${
            isActive
              ? "bg-[#f4cffd] font-[500]"
              : "bg-white font-[300] hover:bg-light"
          }`}
        >
          {name}
        </div>
      </Link>
    </li>
  );
};

const ListMenuItem = ({
  name,
  Icon,
  submenu,
  route,
  // activeIndex,
  // index,
}: any) => {
  const location = useLocation();
  const isActive = location.pathname == route;
  const hasMenu = submenu.length != 0;
  const [isOpen, setIsOpen] = useState(false);

  const isSubActive = !!submenu.find(
    (sub: any) => sub.route == location.pathname
  );
  return (
    <li className="mb-5 ">
      {!hasMenu ? (
        <NavLink
          className={`w-full  py-2 px-3 flex duration-1000 items-center space-x-5 rounded-[8px] outline-none ${
            isActive ? "bg-primary text-white" : "text-gray-600 hover:bg-light"
          }`}
          to={route}
        >
          <div className="w-[30px] h-[30px] rounded-full border flex items-center justify-center">
            {/* <img src={icon} className="w-[16px]" alt="" /> */}
            <Icon fill={isActive ? "white" : "#8E92BC"} />
          </div>
          <p className="font-[500] ">{name}</p>
        </NavLink>
      ) : (
        <>
          <div
            className={`w-full cursor-pointer duration-300 py-2 px-3 rounded-[8px] flex items-center justify-between outline-none ${
              isSubActive
                ? "bg-primary text-white"
                : "hover:bg-light text-gray-600"
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex items-center space-x-5 ">
              <div className="w-[30px] h-[30px] rounded-full border flex items-center justify-center">
                {/* <img src={icon} className="w-[16px]" alt="" /> */}
                <Icon fill={isSubActive ? "white" : "#8E92BC"} />
              </div>
              <p className="font-[500] ">{name}</p>
            </div>
            <MdOutlineKeyboardArrowDown className="text-2xl" />
          </div>
          <div
            className={`
              overflow-hidden transition-[max-height] duration-300 flex ps-6
              ${isOpen ? "max-h-[20rem]" : "h-0"}
            `}
          >
            <ul className="w-[80%] border-l-2  rounded-[10px] -top-4 relative">
              {submenu.map(({ name, route }: any, index: number) => (
                <SubMenuItem name={name} route={route} key={index} />
              ))}
            </ul>
          </div>
        </>
      )}
    </li>
  );
};

const MobileContainer = ({ children, sideOpen }: any) => {
  return (
    <div
      className={`${!sideOpen? "-translate-x-full": ""} w-[80%] z-[100] shadow-2xl fixed sm:hidden ease-in-out duration-1000 bg-white transition-all py-4 overflow-y-auto overflow-x-hidden h-screen`}
    >
      {children}
    </div>
  );
};

const DesktopContainer = ({ children }: any) => {
  return (
    <div
      className={`hidden sm:block w-[20%] sm:relative ease-in-out relative duration-1000 transition-all py-4 overflow-y-auto border-r h-screen`}
    >
      {children}
    </div>
  );
};

const Content = ({ pages }: any) => {
  return (
    <div className="sm:w-auto w-screen">
      <div className="px-10 mx-auto flex items-center justify-between">
        <img src={logoImg} alt="" className="w-[70px] mx-auto" />
        <button><FaX/></button>
      </div>
      <div className="mt-12 px-6">
        <ul className="text-sm mt-4">
          {pages.map((item: any, index: number) => (
            <ListMenuItem key={index} index={index} {...item} activeIndex={0} />
          ))}
        </ul>
      </div>
    </div>
  );
};

const Sidebar: FC<any> = ({ pages, sideOpen, setSideOpen }: any) => {
  const content = <Content pages={pages} />;
  return (
    <>
      <MobileContainer
        children={content}
        {...{ sideOpen, setSideOpen }}
      />
      <DesktopContainer children={content} />
    </>
  );
};

export default Sidebar;
