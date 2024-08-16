import { Route } from "react-router-dom";
import DashboardLayout from "../layouts/layout";
import CreateProfile from "../pages/Dashboard/CreateProfile";

function ParentRoutes() {

  return (
    <>
      <Route path="profile/create" element={<CreateProfile />} />
    </>

  );
}

export default ParentRoutes;
