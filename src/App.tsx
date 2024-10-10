import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
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

const env = import.meta.env;


function App() {


  useEffect(() => {
    const token = useToken();
    ConfigureLibrary.save({
      baseUrl: env.VITE_APP_API_BASE_URL,
      authType: "student",
      token: token ? JSON.parse(token) : "",
    });

  }, []);



  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* auth routes */}
        <Route path="/auth/:token" element={<LogToken />} />
        <Route element={<ProtectedRoutes />}>
          {StudentRoutes()}
          {ParentRoutes()}
          <Route path="/books/:bookId/study" element={<Study />} />
        </Route>
        <Route path="*" element={<Navigate to="/student/dashboard/home" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
