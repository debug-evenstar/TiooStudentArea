import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import ScrollToTop from "./utils/scrollTop";
import LogToken from "./old-pages/Auth/LogToken";
import { FaClock } from "react-icons/fa";
import { ConfigureLibrary } from "@Praxeum-ai/LearnBlocks";
import Study from "./pages/Dashboard/student/books/Study";
import { useEffect } from "react";

import ProtectedRoutes from "./components/Auth/ProtectedRoutes";
import StudentRoutes from "./routes/student";
import ParentRoutes from "./routes/parent";
import DashboardLayout from "./layouts/layout";

const env = import.meta.env;

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
                    <Route path="/student" element={<DashboardLayout />}>
                        {StudentRoutes()}
                    </Route>
                    <Route path="/parent" element={<DashboardLayout />}>
                        {ParentRoutes()}
                    </Route>
                    <Route path="/books/:bookId/study" element={<Study />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
