import { useState, useEffect } from "react";
import BooksComponent from "../../../../components/dashboard/students/BooksComponent";
import { dashboardApiSlice } from "../../../../services/api/dashboardSlice";

export default function Shelf() {
  const { data } = dashboardApiSlice.useGetStudentShelfQuery();

  const [books, setBooks] = useState([]);

  useEffect(() => {
    if(data){
      setBooks(data?.data);
    }
    console.log(data?.data);
  },[data])

  return (
    <div className="w-[90%] mt-7">
      { <BooksComponent type="shelf" books={books} />}
    </div>
  );
}
