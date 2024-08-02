import { useDispatch } from "react-redux";
import ProfileCard from "../../../components/dashboard/students/ProfileCard";
import RecommendedBooks from "../../../components/dashboard/students/RecommendedBooks";
import { dashboardApiSlice } from "../../../services/api/dashboardSlice";
import { updateShelf } from "../../../redux/reducers/userReducer";

const Dashboard = () => {
  const studentShelf = dashboardApiSlice.useGetStudentShelfQuery();
  const { data, error, isLoading } = studentShelf;

  const dispatch = useDispatch();

  if (!error && !isLoading) {
    dispatch(updateShelf(data.data));
  }

  return (
    <div className="mt-7">
      <ProfileCard />
      <RecommendedBooks />
    </div>
  );
};

export default Dashboard;
