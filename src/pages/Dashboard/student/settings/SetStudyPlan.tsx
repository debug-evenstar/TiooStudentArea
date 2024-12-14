import React, { useEffect, useState } from "react";

import { FaBook, FaLock } from "react-icons/fa6";
import SettingsMenu from "../../../../components/Common/SettingsMenu";
import { examsApiSlice } from "../../../../services/api/examsSlice";
import { FaRegFileAlt } from "react-icons/fa";

export default function SetStudyPlan() {
  const [settingLinks, setSettingLinks] = useState([]);
  const registeredExamsRequests = examsApiSlice.useGetAccountExamsQuery(null);

  useEffect(() => {
    const links = registeredExamsRequests?.data?.data?.map((e: any) => ({
      name: e.name,
      icon: <FaRegFileAlt />,
      link: `/student/dashboard/onboarding/study-plan/${e.id}`,
    }));
    setSettingLinks(links);
  }, []);



  return (
    <div className="py-10">
      <SettingsMenu hasBack settingsLinks={settingLinks} />
    </div>
  );
}