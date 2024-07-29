// import bookCoverImg from "@/assets/images/book-cover.png";
import BookCard from "./BookCard";
import { dashboardApiSlice } from "../../../services/api/dashboardSlice";
import { useEffect, useState } from "react";


export default function RecommendedBooks() {

    const { data } = dashboardApiSlice.useGetLibraryBooksQuery(null);
    const [books, setBooks] = useState([]);
  
    useEffect(() => {
      if(data){
        setBooks(data?.data);
      }
      console.log(data?.data);
    },[data])
  
  return (
    <div className="border rounded-[16px] w-full p-6 mt-5 mb-10">
      <h3 className="text-3xl mb-4">Recommended Books</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
      {/* { <BooksComponent books={books} />} */}

        {books.map((book: any, index: number) => (
          <BookCard key={index} {...book} />
        ))}
      </div>
    </div>
  );
}
