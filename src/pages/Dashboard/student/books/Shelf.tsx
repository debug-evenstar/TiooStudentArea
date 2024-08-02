import { useState, useEffect } from "react";
import BooksComponent from "../../../../components/dashboard/students/BooksComponent";
import { dashboardApiSlice } from "../../../../services/api/dashboardSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

export default function Shelf() {
  const { data } = dashboardApiSlice.useGetStudentShelfQuery();

  const [books, setBooks] = useState([]);

  const booksSelect = useSelector((state: RootState) => state.user.shelf);

  console.log(booksSelect);
  useEffect(() => {
    if (data) {
      setBooks(data?.data);
    }
  }, [data]);

  return (
    <div className="w-full mt-7">
      {<BooksComponent type="shelf" books={books} />}
    </div>
  );
}
