// import bookCoverImg from "@/assets/images/book-cover.png";
import BookCard from "./BookCard";
import { dashboardApiSlice } from "../../../services/api/dashboardSlice";
import { useEffect, useState } from "react";
import EmptyCollection from "../common/EmptyCollection";
import { BookCardSkeleton } from "./BookCardSkeleton";

export default function BooksList({ type, title }: { type: string, title: string}) {
  const { data, isLoading, refetch } = dashboardApiSlice.useGetLibraryBooksQuery(null);
  const [books, setBooks] = useState([]);
  const [ falseLoader, setFalseLoader ] = useState(true);

  useEffect(() => {
    if (data) {
      setBooks(data?.data?.filter((book: any) => book.book_type?.toLowerCase() == type.toLowerCase()));
    }
  }, [data]);


  useEffect(() => {
    refetch();
    setTimeout(() => setFalseLoader(false),2000);
  },[]);
  
  return (
    <div className="mt-8">
      <h3 className="text-3xl text-gray-800 capitalize">{title}</h3>
      <div className="rounded-[16px] bg- w-full mt-5 mb-10">
        <div className={`${books.length ? "grid": "" } grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 bg-[ border-[#f9f7f3] gap-4 w-full`}>
          {!isLoading && !falseLoader? (
            books.length ? (
              books.map((book: any, index: number) => (
                <BookCard key={index} {...book} />
              ))
            ) : (
              <EmptyCollection text="No books yet" />
            )
          ) : (
            <>
              <BookCardSkeleton />
              <BookCardSkeleton />
              <BookCardSkeleton />
              <BookCardSkeleton />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
