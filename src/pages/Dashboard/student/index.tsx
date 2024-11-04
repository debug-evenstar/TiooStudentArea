import { useDispatch } from "react-redux";
import ProfileCard from "../../../components/dashboard/students/ProfileCard";
import RecommendedBooks from "../../../components/dashboard/students/BooksList";
import { dashboardApiSlice } from "../../../services/api/dashboardSlice";
import { updateShelf } from "../../../redux/reducers/userReducer";
import BooksList from "../../../components/dashboard/students/BooksList";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import BannerAnnouncement from "../../../components/Common/Announcement";
import TargetScoreCard from "../../../components/dashboard/students/TargetScoreCard";

const Dashboard = () => {
  const studentShelf = dashboardApiSlice.useGetStudentShelfQuery();
  const { data, error, isLoading } = studentShelf;
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  if (!error && !isLoading) {
    dispatch(updateShelf(data.data));
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <>
      <BannerAnnouncement />
      <div className="mt-7">
        <div className="flex flex-col lg:flex-row gap-5">
          {loading ? (
            <>
              <div className="lg:w-[55%] ">
                <Skeleton borderRadius={16} height={230} width="" />
              </div>
              <div className="lg:w-[40%]">
                <Skeleton borderRadius={16} height={230} width="" />
              </div>
            </>
          ) : (
            <>
              <ProfileCard />
              <TargetScoreCard />
            </>
          )}
        </div>
        {/* FOR Now the Type Names must match the book type ( it's lower case sha) */}
        <BooksList title="Tutorials" type="tutorial" />
        <BooksList title="Past Questions" type="past questions" />

        {/* <RecommendedBooks /> */}
      </div>
    </>
  );
};

export default Dashboard;
