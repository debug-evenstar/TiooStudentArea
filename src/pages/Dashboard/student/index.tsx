import { useDispatch } from "react-redux";
import ProfileCard from "../../../components/dashboard/students/ProfileCard";
import RecommendedBooks from "../../../components/dashboard/students/BooksList";
import { dashboardApiSlice } from "../../../services/api/dashboardSlice";
import { updateShelf } from "../../../redux/reducers/userReducer";
import BooksList from "../../../components/dashboard/students/BooksList";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import BannerAnnouncement from "../../../components/Common/Announcement";

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
        {loading ? (
          <div className="lg:w-[60%] ">
            <Skeleton borderRadius={16} height={210} width="" />
          </div>
        ) : (
          <ProfileCard />
        )}
        {/* FOR Now the Type Names must match the book type ( it's lower case sha) */}
        <BooksList title="Tutorials" type="tutorial" />
        <BooksList title="Past Questions" type="past questions" />

        {/* <RecommendedBooks /> */}
      </div>
    </>
  );
};

export default Dashboard;
