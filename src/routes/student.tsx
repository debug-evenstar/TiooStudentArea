import { Navigate, Route } from "react-router-dom";

import StudentDashboard from "../pages/Dashboard/student";
import DashboardLayout from "../layouts/layout";
import Library from "../pages/Dashboard/student/books/Library";
import Shelf from "../pages/Dashboard/student/books/Shelf";
import Settings from "../pages/Dashboard/student/Settings";
import Analytics from "../pages/Dashboard/student/Analytics";
import ComingSoon from "../components/Common/ComingSoon";


function StudentRoutes() {
  return (
    <>

      <Route
        path="dashboard/home"
        element={<StudentDashboard />}
      />
      <Route path="dashboard/books">
        <Route path="library" index element={<Library />} />
        <Route path="shelf" element={<Shelf />} />
        <Route path="school" element={<ComingSoon />} />
      </Route>
      <Route
        path="dashboard/analytics"
        element={<Analytics />}
      />
      <Route path="dashboard/network" element={<ComingSoon />} />
      <Route
        path="dashboard/settings"
        element={<Settings />}
      />
      <Route path="*" element={<Navigate to="dashboard/home" />} />
    </>
  );
}

export default StudentRoutes;