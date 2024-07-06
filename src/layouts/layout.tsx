import { Outlet } from "react-router-dom";

import Nav from "../components/layouts/nav";
import Sidebar from "../components/layouts/sidebar";

import gearImg from '@/assets/icons/gear.svg';
import cardImg from '@/assets/icons/card.svg';
import userImg from '@/assets/icons/user.svg';
import paperImg from '@/assets/icons/paper.svg';
import { AnalyticsIcon, BooksIcon, DashboardIcon, NetworkIcon, SettingsIcon } from "../components/Icons";



export default function DashboardLayout() {




  const pages: any[] = [
    {name: "Dashboard",Icon: DashboardIcon ,route: '/dashboard/home',submenu: []},
    {name: "Books",Icon: BooksIcon,route: '/dashboard/books', submenu: [
      {name: "Library", route: '/dashboard/books/library'},
      {name: "My shelf", route: '/dashboard/books/shelf'},
      {name: "School books", route: '/dashboard/books/school'},
    ]},
    {name: "Analytics",Icon: AnalyticsIcon,route: '/dashboard/analytics',submenu: []},
    {name: "Network",Icon: NetworkIcon,route: '/dashboard/network',submenu: []},
    {name: "Settings",Icon: SettingsIcon,route: '/dashboard/settings',submenu: []},
  ];

  return (
    <div className="flex h-screen overflow-hidden outfit-font">
      <Sidebar pages={pages} />
      <main className="grow flex flex-col w-[79.5%]">
        <Nav pages={pages} />
        <div className="px-6 overflow-hidden grow overflow-y-auto">
          <Outlet/>
        </div>
      </main>
    </div>
  );
}
