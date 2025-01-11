import { Navigate, Route } from "react-router-dom";

import DashboardLayout from "../layouts/layout";
import Library from "../pages/Dashboard/student/books/Library";
import Shelf from "../pages/Dashboard/student/books/Shelf";
import Settings from "../pages/Dashboard/student/Settings";
import Analytics from "../pages/Dashboard/student/Analytics";
import ComingSoon from "../components/Common/ComingSoon";
import { studentPages } from "../constants/sidelinks";
import Curator from "../pages/Dashboard/student/books/Curator";
import Referral from "../pages/Dashboard/student/Referral";
import StudyArea from "../pages/Dashboard/student/books/StudyArea";
import StudyLayout from "../layouts/studyLayout";
import Onboarding from "../pages/Dashboard/student/Onboarding";
import StudyPlan from "../pages/Dashboard/student/StudyPlan";
import AdmissionSetup from "../pages/Dashboard/student/onboarding/admissionSetup";
import UniversitySetup from "../pages/Dashboard/student/onboarding/universitySetup";
import ExamDashboard from "../pages/Dashboard/student/ExamDashboard";
import PracticeExam from "../pages/Dashboard/student/exams/PractiveExam";
import PasswordReset from "../pages/Dashboard/student/settings/PasswordReset";
import SetStudyPlan from "../pages/Dashboard/student/settings/SetStudyPlan";
import ProfileSettings from "../pages/Dashboard/student/settings/ProfileSettings";

function StudentRoutes() {
  return (
    <>
      <Route path="/student" element={<DashboardLayout pages={studentPages} />}>
        <Route path="dashboard/home" element={<Onboarding />} />
        <Route path="dashboard/exam/:exam_id" element={<ExamDashboard />} />
        <Route
          path="dashboard/exam/:exam_id/to-assessment"
          element={<PracticeExam />}
        />
        <Route
          path="dashboard/onboarding/admissions/:exam_id"
          element={<AdmissionSetup />}
        />
        <Route
          path="dashboard/onboarding/university/:uni_id"
          element={<UniversitySetup />}
        />
        <Route
          path="dashboard/onboarding/study-plan/:exam_id"
          element={<StudyPlan />}
        />
        <Route path="dashboard/books">
          <Route path="library" index element={<Library />} />
          <Route path="shelf" element={<Shelf />} />
          <Route path="school" element={<ComingSoon />} />
          <Route path="curator" element={<Curator />} />
        </Route>
        <Route path="dashboard/analytics" element={<Analytics />} />
        <Route path="dashboard/network" element={<ComingSoon />} />
        <Route path="dashboard/referral" element={<Referral />} />
        <Route path="dashboard/settings">
          <Route path="" element={<Settings />} />
          <Route path="profile" element={<ProfileSettings />} />
          <Route path="reset-password" element={<PasswordReset />} />
          <Route path="set-study-plan" element={<SetStudyPlan />} />
        </Route>

        <Route path="*" element={<Navigate to="dashboard/home" />} />
      </Route>
      <Route path="/book" element={<StudyLayout pages={studentPages} />}>
        <Route path="study-area/:bookId" element={<StudyArea />} />
      </Route>
    </>
  );
}

export default StudentRoutes;
