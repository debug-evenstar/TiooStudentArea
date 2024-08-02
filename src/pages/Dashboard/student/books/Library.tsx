// import bookCoverImg from "@/assets/images/book-cover.png";
import BooksComponent from "../../../../components/dashboard/students/BooksComponent";
import { dashboardApiSlice } from "../../../../services/api/dashboardSlice";
import { useEffect, useState } from "react";

interface Book {
  cover_photo: string;
  name: string;
  author: string;
  id: number;
  type?: string;
  inShelf?: boolean;

  // other properties of the book
}

export default function Library() {
  // const books = Array(9)
  //   .fill(null)
  //   .map(() => ({
  //     image: bookCoverImg,
  //     title: "A Children Book Ab...",
  //     author: "Joy Berry",
  //   }));

  const libraryBooks = dashboardApiSlice.useGetLibraryBooksQuery(null);

  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (libraryBooks.data) {
      setBooks(libraryBooks?.data?.data);
      // setBooks(libraryBooks?.data?.data?.map((book: Book) => ({ ...book, inShelf: shelfIds?.includes(book?.id)})));
    }
  }, [libraryBooks.data]);

  return (
    <div className="w-[100%] mt-7">{<BooksComponent books={books} />}</div>
  );
}
