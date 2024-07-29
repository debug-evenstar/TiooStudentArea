import { AnalyticsIcon, BooksIcon, DashboardIcon, NetworkIcon, SettingsIcon } from "../components/Icons";


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

export default pages;