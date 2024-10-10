import { useDispatch } from "react-redux";
import ProfileCard from "../../../components/dashboard/students/ProfileCard";
import RecommendedBooks from "../../../components/dashboard/students/BooksList";
import { dashboardApiSlice } from "../../../services/api/dashboardSlice";
import { updateShelf } from "../../../redux/reducers/userReducer";
import BooksList from "../../../components/dashboard/students/BooksList";

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
      {/* FOR Now the Type Names must match the book type ( it's lower case sha) */}
      <BooksList title="Tutorials" type="tutorial" />
      <BooksList title="Past Questions" type="past questions" />

      {/* <RecommendedBooks /> */}
    </div>
  );
};

export default Dashboard;
