// import bookCoverImg from "@/assets/images/book-cover.png";
import BooksComponent from "../../../../components/dashboard/students/BooksComponent";
import { dashboardApiSlice } from "../../../../services/api/dashboardSlice";
import { useEffect, useState } from "react";

export default function Library() {
  // const books = Array(9)
  //   .fill(null)
  //   .map(() => ({
  //     image: bookCoverImg,
  //     title: "A Children Book Ab...",
  //     author: "Joy Berry",
  //   }));

  const { data } = dashboardApiSlice.useGetLibraryBooksQuery(null);

  const [books, setBooks] = useState([]);

  useEffect(() => {
    if(data){
      setBooks(data?.data);
    }
    console.log(data?.data);
  },[data])

  return (
    <div className="w-[100%] mt-7">
      { <BooksComponent books={books} />}
    </div>
  );
}
