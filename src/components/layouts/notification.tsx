import notificationImg from "@/assets/icons/notification.svg";
import { useState } from "react";
import { MdNotificationsNone } from "react-icons/md";

interface NotificationItemProps {
  title: string;
  content: string;
}

interface NotificationDropDownProps {
  isOpen: boolean;
}

const NotificationItem = ({ title, content }: NotificationItemProps) => {
  return (
    <li className="text-start border border-neutral-399 rounded-[8px] py-3 px-2 mb-3  ">
      <p>{title}</p>
      <p className="text-gray-600 urbanist text-sm">{content}</p>
    </li>
  );
};

const NotificationDropdown = ({ isOpen }: NotificationDropDownProps) => {
  // const [loading, setLoading ] = useState(false);

  const [notifications] = useState<NotificationItemProps[]>([]);

  return (
    <div
      className={`absolute min-h-[10rem] max-h-[33rem] overflow-y-auto w-full sm:w-[25%] right-0 sm:right-16 z-[110] mt-6 rounded-lg border shadow bg-white p-3 text-center ${
        isOpen ? "block" : "hidden"
      } `}
    >
      { notifications.length ? <h3 className="font-[500] mb-2 text-xl">Notification</h3> : null } 
      <ul className="">
        {notifications.length ? 
        notifications?.map((item) => (
          <NotificationItem {...item} />
        ))
        : 
        <div className="py-5 mt-6 flex flex-col text-gray-600 items-center justify-center">
          <MdNotificationsNone size={21}/>
          <span className="text-sm">No notifications yet</span>
        </div>
      }
      </ul>
    </div>
  );
};

export default function Notifications() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const overlayStyle = isOpen ? "block" : "hidden";
  return (
    <div>
      <button onClick={toggle} className="rounded-full p-2 border">
        <img src={notificationImg} alt="" className="w-[25px] h-[25px]" />
      </button>
      <NotificationDropdown isOpen={isOpen} />
      <div
        onClick={toggle}
        className={`${overlayStyle} transation-all z-[100] duration-1000 fixed bg-[#00000022] inset-0 `}
      ></div>
    </div>
  );
}
