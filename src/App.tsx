import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import DashboardHomePage from "./pages/Dashboard/Home";
import SubjectDetails from "./pages/Dashboard/SubjectDetails";
import ScrollToTop from "./utils/scrollTop";
import LibraryHome from "./pages/Library";
import LogToken from "./pages/Auth/LogToken";
import LessonComponent from "./pages/LessonComponent";
import TextBookChapters from "./pages/Library/textbookDetails";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* auth routes */}
        <Route path="/auth/:token" element={<LogToken />} />
        {/* dasboard routes */}
        <Route path="/home" element={<DashboardHomePage />} />
        <Route path="/home/subjects/:id" element={<SubjectDetails />} />
        <Route path="/library" element={<LibraryHome />} />
        <Route path="/library/subjects/:id" element={<TextBookChapters />} />
        <Route path="/lesson/:id" element={<LessonComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
