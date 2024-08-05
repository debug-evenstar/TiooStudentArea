import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ScrollToTop from "./utils/scrollTop";
import LogToken from "./old-pages/Auth/LogToken";
import StudentDashboard from "./pages/Dashboard/student";
import DashboardLayout from "./layouts/layout";
import Library from "./pages/Dashboard/student/books/Library";
import Shelf from "./pages/Dashboard/student/books/Shelf";
import Settings from "./pages/Dashboard/student/Settings";
import { FaClock } from "react-icons/fa";
import Analytics from "./pages/Dashboard/student/Analytics";
import { ConfigureLibrary, LessonPage } from "@Praxeum-ai/LearnBlocks";
import Study from "./pages/Dashboard/student/books/Study";
import { useEffect } from "react";
import { LuSettings } from "react-icons/lu";
import ParentDashboardLayout from "./layouts/parentLayout";
import CreateProfile from "./pages/Dashboard/CreateProfile";
const env = import.meta.env;
// import Profiles from "./pages/Dashboard/parent/Profiles";
// import CreateProfile from "./pages/Dashboard/CreateProfile";

const ComingSoon = () => {
    return (
        <div className="flex items-center h-full w-full justify-center">
            <p className="px-20 py-10 text-gray-500 border rounded-full flex items-center space-x-2">
                <FaClock />
                <span>coming soon</span>
            </p>
        </div>
    );
};

function App() {
      useEffect(()=>{
        ConfigureLibrary.save({
            baseUrl : env.VITE_APP_API_BASE_URL
        })
    },[]);
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                {/* auth routes */}
                <Route element={<DashboardLayout />}>
                    <Route path="/auth/:token" element={<LogToken />} />
                    <Route
                        path="/dashboard/home"
                        element={<StudentDashboard />}
                    />
                    <Route path="/dashboard/books">
                        <Route path="library" index element={<Library />} />
                        <Route path="shelf" element={<Shelf />} />
                        <Route path="school" element={<ComingSoon />} />
                    </Route>
                    <Route
                        path="/dashboard/analytics"
                        element={<Analytics />}
                    />
                    <Route path="/dashboard/network" element={<ComingSoon />} />
                    <Route
                        path="/dashboard/settings"
                        element={<Settings />}
                    />
                </Route>
                <Route path="/dashboard/books/:bookId/study" element={<Study />} />
                <Route path="/books/:bookId/study" element={<Study />} />


                <Route element={<ParentDashboardLayout/>} path="/dashboard/parents">
                    
                    <Route path="profile/create" element={<CreateProfile/>} />

                </Route>


            </Routes>
        </BrowserRouter>
    );
}

export default App;
