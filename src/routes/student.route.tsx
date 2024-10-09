import { Navigate, Route } from "react-router-dom";

import StudentDashboard from "../pages/Dashboard/student";
import DashboardLayout from "../layouts/layout";
import Library from "../pages/Dashboard/student/books/Library";
import Shelf from "../pages/Dashboard/student/books/Shelf";
import Settings from "../pages/Dashboard/student/Settings";
import Analytics from "../pages/Dashboard/student/Analytics";
import ComingSoon from "../components/Common/ComingSoon";
import { studentPages } from "../constants/sidelinks";
import Network from "../pages/Dashboard/student/Network";
import Curator from "../pages/Dashboard/student/books/Curator";
import Referral from "../pages/Dashboard/student/Referral";
import StudyArea from "../pages/Dashboard/student/books/StudyArea";
import StudyLayout from "../layouts/studyLayout";
import Onboarding from "../pages/Dashboard/student/Onboarding";
import JambOnboarding from "../pages/Dashboard/student/jamb/JambOnboarding";

function StudentRoutes() {
  return (
    <>
      <Route path="/student" element={<DashboardLayout pages={studentPages} />}>
        <Route path="dashboard/home" element={<StudentDashboard />} />
        <Route path="dashboard/onboarding" element={<Onboarding />} />
        <Route path="dashboard/onboarding/jamb" element={<JambOnboarding />} />
        <Route path="dashboard/books">
          <Route path="library" index element={<Library />} />
          <Route path="shelf" element={<Shelf />} />
          <Route path="school" element={<ComingSoon />} />
          <Route path="curator" element={<Curator />} />
        </Route>
        <Route path="dashboard/analytics" element={<Analytics />} />
        <Route path="dashboard/network" element={<ComingSoon />} />
        <Route path="dashboard/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="dashboard/home" />} />
      </Route>
    </>
  );
}

export default StudentRoutes;
