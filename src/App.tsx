import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ScrollToTop from "./utils/scrollTop";
import LogToken from "./old-pages/Auth/LogToken";
import StudentDashboard from "./pages/Dashboard/student";
import DashboardLayout from "./layouts/layout";
import Library from "./pages/Dashboard/student/books/Library";
import Shelf from "./pages/Dashboard/student/books/Shelf";
import { FaClock } from "react-icons/fa";
import Analytics from "./pages/Dashboard/student/Analytics";
import { LessonPage } from "@Praxeum-ai/LearnBlocks";
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
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* auth routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/auth/:token" element={<LogToken />} />
          <Route path="/dashboard/home" element={<StudentDashboard />} />
          <Route path="/dashboard/books">
            <Route path="library" index element={<Library />} />
            <Route path="shelf" element={<Shelf />} />
            <Route path="school" element={<ComingSoon />} />
          </Route>
          <Route path="/dashboard/analytics" element={<Analytics />} />
          <Route path="/dashboard/network" element={<ComingSoon />} />
          <Route path="/dashboard/settings" element={<ComingSoon />} />
        </Route>
        {/*<Route path="/dashboard/parents/profile/craete" element={<CreateProfile/>} />*/}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
