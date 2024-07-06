import ProfileCard from "../../../components/dashboard/students/ProfileCard";
import RecommendedBooks from "../../../components/dashboard/students/RecommendedBooks";


const Dashboard = () => {
	return (
		<div className="mt-7">
			<ProfileCard/>
			<RecommendedBooks/>
		</div>
	);
}

export default Dashboard;