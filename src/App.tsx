import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import { ConfigureLibrary } from "@Praxeum-ai/LearnBlocks";
import Study from "./pages/Dashboard/student/books/Study";
import { useEffect } from "react";
import ParentDashboardLayout from "./layouts/parentLayout";
import CreateProfile from "./pages/Dashboard/CreateProfile";

import ProtectedRoutes from "./components/Auth/ProtectedRoutes";

const env = import.meta.env;

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
    useEffect(() => {
        ConfigureLibrary.save({
            baseUrl: env.VITE_APP_API_BASE_URL
        })
    }, []);
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                {/* auth routes */}
                <Route path="/auth/:token" element={<LogToken />} />
                <Route element={<ProtectedRoutes />} >
                    <Route element={<DashboardLayout />}>
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
                    <Route path="/books/:bookId/study" element={<Study />} />
                    {/* TODO: make sure  books are from  */}

                    <Route element={<ParentDashboardLayout />} path="/dashboard/parents">

                        <Route path="profile/create" element={<CreateProfile />} />

                    </Route>

                    <Route path="*" element={<Navigate to="/dashboard/home" />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;
