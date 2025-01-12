import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import ScrollToTop from "./utils/scrollTop";
import LogToken from "./pages/Auth/LogToken";
import { ConfigureLibrary } from "@Praxeum-ai/LearnBlocks";
import { lazy, Suspense, useEffect } from "react";
import ProtectedRoutes from "./components/Auth/ProtectedRoutes";
import StudentRoutes from "./routes/student.route";
import { useToken } from "./hooks/useToken";
import { NoticeProvider } from "./hooks/useExamNotice";
import { useDispatch } from "react-redux";
import { examsApiSlice } from "./services/api/examsSlice";
import Subscription from "./pages/Payment/Subscription";

// Lazy load components
const Study = lazy(() => import("./pages/Dashboard/student/books/Study"));
const Assessment = lazy(() => import("./pages/Dashboard/student/exams/Assessment"));

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
            <Route path="/subscription" element={<Subscription />} />
            {StudentRoutes()}
            {/* ParentRoutes can be included here */}
            <Route
              path="/books/:bookId/study"
              element={
                <Suspense fallback={<div>Loading Study...</div>}>
                  <Study />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="/exams/assessment/:exam_id"
            element={
              <Suspense fallback={<div>Loading Assessment...</div>}>
                <Assessment />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/student/dashboard/home" />} />
        </Routes>
      </NoticeProvider>
    </BrowserRouter>
  );
}

export default App;
