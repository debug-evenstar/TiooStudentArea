import { FC, MouseEventHandler, useEffect, useState } from "react";
import BookFilter from "../common/Filter";
import SearchBar from "../common/SearchBar";
import BookCard, { BookCardProps } from "./BookCard";
import EmptyCollection from "../common/EmptyCollection";
import { BookCardSkeleton } from "./BookCardSkeleton";
import { dashboardApiSlice } from "../../../services/api/dashboardSlice";

export interface BooksComponentProps {
  books: any;
  type?: string;
  isLoading: boolean;
}
interface RemoveFromShelfModalProps {
  title?: string;
  content?: string;
  onCancel: MouseEventHandler<HTMLButtonElement>;
  onDelete: MouseEventHandler<HTMLButtonElement>;
}

const RemoveFromShelfModal: FC<RemoveFromShelfModalProps> = ({ title, content, onCancel, onDelete }) => (
  <div className="bg-[#00000022] inset-0 fixed w-full h-screen z-[200] flex justify-center ">
    <div className="w-full shadow sm:w-[20rem] lg:w-[25rem] bg-white p-8 py-6 rounded-lg mt-20 h-fit">
      <div className="text-lg py-2 font-[600] text-gray-800">
        <p>{title}</p>
      </div>
      <div className="text-gray-700 py-2 mb-3">
        <p>{content}</p>
      </div>
      <div className="flex items-center justify-end space-x-3">
        <button onClick={onCancel} className="text-gray-600 px-4 shadow py-2 rounded">Cancel</button>
        <button onClick={onDelete} className="text-white px-4 shadow bg-red-600 py-2 rounded">Remove</button>
      </div>
    </div>
  </div>
);

const BooksComponent: FC<BooksComponentProps> = ({ books, type, isLoading }) => {
  const [search, setSearch] = useState("");
  const [currentBookID, setCurrentBookID] = useState<number | null>();
  const [removeFromShelf] = dashboardApiSlice.useRemoveFromStudentShelfMutation();

  const [showDelete, setShowDelete] = useState(false);
  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const [filteredBooks, setFilteredBooks] = useState(books);

  const handleOpenRemoveModal = async (id: any) => {
    setShowDelete(true);
    setCurrentBookID(id);
  };

  const handleRemoveFromShelfQuery = async () => {
    if (currentBookID)
      await removeFromShelf({ textbook_id: currentBookID });
    setShowDelete(false);
  }


  useEffect(() => {
    const match = books.filter((book: any) =>
      book.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredBooks(match);
  }, [search, books]);
  return (
    <div className="w-full sm:w-[90%]">
      {showDelete && (
        <RemoveFromShelfModal
          title="Remove Book"
          content="Are you sure you want to remove this book?"
          onCancel={() => setShowDelete(false)}
          onDelete={handleRemoveFromShelfQuery}
        />
      )}
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
        <div className={`${filteredBooks?.length ? "grid-cols-2 md:grid-cols-4" : ""} grid  gap-3 w-full`}>
          {
            !isLoading ?
              (filteredBooks?.length ?
                filteredBooks?.map((book: any, index: number) => (
                  <BookCard
                    removeModalHandler={handleOpenRemoveModal}
                    setShowDelete={setShowDelete}
                    type={type}
                    key={index} {...book}
                  />
                ))

                : (
                  <EmptyCollection text="No books on shelf yet" />
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
