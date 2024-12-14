import { FC } from "react";
import { FaLock, FaBook } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

export interface SettingLinkProps {
  link: string;
  name: string;
  icon: any;
}

export interface SettingsMenuProps {
  settingsLinks: SettingLinkProps[];
  hasBack?: boolean;
}


const SettingsMenu: FC<SettingsMenuProps> = ({ settingsLinks, hasBack }) => {
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);

  return (
    <div className="w-full lg:max-w-xl">
      {hasBack && (
        <button onClick={handleBack} className="mb-5 flex items-center gap-3">
          <FaArrowLeft />
          <span>back</span>
        </button>
      )}
      {settingsLinks?.map((item, index) => (
        <Link
          key={index}
          to={item.link}
          className="flex items-center justify-between bg-white outfit-font text-gray-800 px-4 py-4 rounded-lg mb-3 shadow-sm hover:shadow-md hover:bg-gray-50 transition"
        >
          <div className="flex items-center">
            {item.icon && <span className="mr-3 text-xl">{item.icon}</span>}
            <span className="font-medium">{item.name}</span>
          </div>
          <FaArrowRight className="text-gray-500" />
        </Link>
      ))}
    </div>
  );
};

export default SettingsMenu;
