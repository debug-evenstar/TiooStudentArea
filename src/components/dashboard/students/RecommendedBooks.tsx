// import bookCoverImg from "@/assets/images/book-cover.png";
import BookCard from "./BookCard";
import { dashboardApiSlice } from "../../../services/api/dashboardSlice";
import { useEffect, useState } from "react";
import EmptyCollection from "../common/EmptyCollection";
import { BookCardSkeleton } from "./BookCardSkeleton";

export default function RecommendedBooks() {
  const { data, isLoading } = dashboardApiSlice.useGetLibraryBooksQuery(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (data) {
      setBooks(data?.data);
    }
  }, [data]);

  return (
    <div className="mt-8">
      <h3 className="text-3xl text-gray-800">Tutorials and past questions</h3>
      <div className="rounded-[16px] bg- w-full mt-5 mb-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 bg-[ border-[#f9f7f3] gap-4 w-full">
          {!isLoading ? (
            books.length ? (
              books.map((book: any, index: number) => (
                <BookCard key={index} {...book} />
              ))
            ) : (
              <EmptyCollection text="No recommended books yet" />
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
