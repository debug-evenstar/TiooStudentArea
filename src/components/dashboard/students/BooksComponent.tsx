import { useEffect, useState } from "react";
import BookFilter from "../common/Filter";
import SearchBar from "../common/SearchBar";
import BookCard, { BookCardProps } from "./BookCard";



export interface BooksComponentProps{
  books: BookCardProps[]
}


const BooksComponent = ({books}: any) => {

  const [ search, setSearch ] = useState('');

  const handleSearchChange = (value: string) => {
    setSearch(value);
  }

  const [ filteredBooks, setFilteredBooks ] = useState(books);

  useEffect(() => {
    const match = books.filter((book: any) => book.name.toLowerCase().includes(search.toLowerCase()))
    setFilteredBooks(match);
  },[search,books])
  return (
    <div className="w-[90%]">
      <h2 className="text-dark text-3xl font-[500] quicksand">All Books({books.length})</h2>
      <div className="my-3 flex items-center space-x-3">
        <BookFilter />
        <SearchBar
          value={search}
          onChange={handleSearchChange}
          placeholder="Search for a book"
        />
      </div>
      <div className="w-full mt-5 mb-10">
        {/* <h3 className="text-3xl mb-4">Recommended Books</h3> */}
        <div className="grid grid-cols-4 gap-y-10 gap-6">
          {filteredBooks?.map((book: BookCardProps, index: number) => (
            <BookCard key={index} {...book} />
          ))}
        </div>
      </div>
    </div>
  );
};


export default BooksComponent;