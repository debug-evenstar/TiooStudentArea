import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import ScrollToTop from "./utils/scrollTop";
import LogToken from "./pages/Auth/LogToken";
import { ConfigureLibrary } from "@Praxeum-ai/LearnBlocks";
import Study from "./pages/Dashboard/student/books/Study";
import { useEffect } from "react";

import ProtectedRoutes from "./components/Auth/ProtectedRoutes";
import StudentRoutes from "./routes/student.route";
import ParentRoutes from "./routes/parent.route";
import { useToken } from "./hooks/useToken";
import Assessment from "./pages/Dashboard/student/exams/Assessment";
import { NoticeProvider } from "./hooks/useExamNotice";
import { useDispatch } from "react-redux";
import { examsApiSlice } from "./services/api/examsSlice";

const env = import.meta.env;

function App() {

    const dispatch = useDispatch();
  useEffect(() => {
    const token = useToken();
    ConfigureLibrary.save({
      baseUrl: env.VITE_APP_API_BASE_URL,
      authType: "student",
      token: token ? token : "",
    });

    //@ts-ignore
    dispatch(examsApiSlice.endpoints.getAccountExams.initiate());

  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <NoticeProvider>
        <Routes>
          {/* auth routes */}
          <Route path="/auth/:token" element={<LogToken />} />
          <Route element={<ProtectedRoutes />}>
            {StudentRoutes()}
            {/* {ParentRoutes()} */}
            <Route path="/books/:bookId/study" element={<Study />} />
          </Route>
          <Route path="*" element={<Navigate to="/student/dashboard/home" />} />
          <Route path="exams/assessment/:exam_id" element={<Assessment />} />
        </Routes>
      </NoticeProvider>
    </BrowserRouter>
  );
}

export default App;
