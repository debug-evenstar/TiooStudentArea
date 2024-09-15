import { AnalyticsIcon, BooksIcon, DashboardIcon, NetworkIcon, SettingsIcon } from "../components/Icons";

export const studentPages: any[] = [
  {name: "Dashboard",Icon: DashboardIcon ,route: '/student/dashboard/home',submenu: []},
  {name: "Books",Icon: BooksIcon,route: '/student/dashboard/books', submenu: [
    {name: "Library", route: '/student/dashboard/books/library'},
    {name: "My shelf", route: '/student/dashboard/books/shelf'},
    {name: "School books", route: '/student/dashboard/books/school'},
  ]},
  {name: "Analytics",Icon: AnalyticsIcon,route: '/student/dashboard/analytics',submenu: []},
  {name: "Network",Icon: NetworkIcon,route: '/student/dashboard/network',submenu: []},
  // {name: "Referrals",Icon: NetworkIcon,route: '/student/dashboard/referals',submenu: []},
  {name: "Settings",Icon: SettingsIcon,route: '/student/dashboard/settings',submenu: []},
];

export const parentPages: any[] = [
  {name: "Profiles",Icon: DashboardIcon ,route: '/parent/dashboard/profiles',submenu: []},
  {name: "Blog",Icon: AnalyticsIcon,route: '/parent/dashboard/blog',submenu: []},
  {name: "Payment",Icon: NetworkIcon,route: '/parent/dashboard/payment',submenu: []},
  {name: "Settings",Icon: SettingsIcon,route: '/parent/dashboard/settings',submenu: []},
];