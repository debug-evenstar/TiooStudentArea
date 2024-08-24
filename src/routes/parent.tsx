import { Route } from "react-router-dom";
import Profiles from "../pages/Dashboard/parent/Profiles";
// import CreateProfile from "../pages/Dashboard/parent/CreateProfile";
import DashboardLayout from "../layouts/layout";
import { parentPages } from "../constants/sidelinks";

function ParentRoutes() {

  return (
    <>
      {/* <Route path="/parent/dashboard/profiles/create" element={<CreateProfile />} /> */}
      <Route path="/parent/dashboard" element={<DashboardLayout pages={parentPages} />}>
        <Route path="profiles" element={<Profiles />} />
      </Route>
    </>

  );
}

export default ParentRoutes;
