import { FaBook, FaLock, FaUser } from "react-icons/fa6";
import SettingsMenu from "../../../components/Common/SettingsMenu";

  
  export default function Settings() {
    const settingsLinks = [
      { name: 'Reset Password', link: '/student/dashboard/settings/reset-password', icon: <FaLock /> },
      { name: 'Set Study Plan', link: '/student/dashboard/settings/set-study-plan', icon: <FaBook /> },
      { name: 'Update profile', link: '/student/dashboard/settings/profile', icon: <FaUser /> },
    ];


  
    return (
      <div className="py-10">
        <SettingsMenu settingsLinks={settingsLinks} />
      </div>
    );
  };
  