import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import DashboardHomePage from "./old-pages/Dashboard/Home";
import SubjectDetails from "./old-pages/Dashboard/SubjectDetails";
import ScrollToTop from "./utils/scrollTop";
import LibraryHome from "./old-pages/Library";
// import LogToken from "./old-pages/Auth/LogToken";
import LessonComponent from "./old-pages/LessonComponent";
import TextBookChapters from "./old-pages/Library/textbookDetails";
import PreviewTemplateDoc from "./old-pages/Library/previewTemplateDoc";
import PreviewBook from "./old-pages/Preview";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* auth routes */}
        {/* <Route path="/auth/:token" element={<LogToken />} /> */}
        {/* dasboard routes */}
        <Route path="/home" element={<DashboardHomePage />} />
        <Route path="/home/subjects/:id" element={<SubjectDetails />} />
        <Route path="/library" element={<LibraryHome />} />
        <Route path="/library/subjects/:id" element={<TextBookChapters />} />
        <Route path="/lesson/:id" element={<LessonComponent />} />
        <Route path="/library/:id" element={<PreviewTemplateDoc />} />
        {/* preview lesson */}
        <Route path="/preview" element={<PreviewBook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
