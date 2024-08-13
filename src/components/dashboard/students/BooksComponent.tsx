import { FC, useEffect, useState } from "react";
import BookFilter from "../common/Filter";
import SearchBar from "../common/SearchBar";
import BookCard, { BookCardProps } from "./BookCard";
import EmptyCollection from "../common/EmptyCollection";
import { BookCardSkeleton } from "./BookCardSkeleton";

export interface BooksComponentProps {
  books: BookCardProps[];
  type?: string;
  isLoading: boolean;
}

const BooksComponent: FC<BooksComponentProps> = ({ books, type ,isLoading }) => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const [filteredBooks, setFilteredBooks] = useState(books);

  useEffect(() => {
    const match = books.filter((book: any) =>
      book.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredBooks(match);
  }, [search, books]);
  return (
    <div className="w-full sm:w-[90%]">
      <h2 className="text-dark text-3xl font-[500] quicksand">
        All Books({books.length})
      </h2>
      <div className="my-3 flex items-center space-x-3">
        <BookFilter />
        <SearchBar
          value={search}
          onChange={handleSearchChange}
          placeholder="Search for a book"
        />
      </div>
      <div className="w-full mt-5 mb-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 w-full">
        {
          !isLoading ?
            (books?.length ?
              books?.map((book: any, index: number) => (
                <BookCard type={type} key={index} {...book} />
              ))

              : (
                <EmptyCollection text="No recommended books yet" />
              ))
            :
            <>
              <BookCardSkeleton />
              <BookCardSkeleton />
              <BookCardSkeleton />
              <BookCardSkeleton />
            </>
        }
      </div>
{/* 
        {books.length ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-5 sm:gap-y-10 gap-3 sm:gap-6">
            {filteredBooks?.map((book: BookCardProps, index: number) => (
              
              <BookCard type={type} key={index} {...book} />
            ))}
          </div>
        ) : (
          <EmptyCollection text={ !(type =="shelf") ? "No books in library yet":  "No books in shelf yet" }/>
        )} */}
      </div>
    </div>
  );
};

export default BooksComponent;
