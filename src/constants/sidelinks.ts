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
  {name: "Settings",Icon: SettingsIcon,route: '/student/dashboard/settings',submenu: []},
];

export const parentPages: any[] = [
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