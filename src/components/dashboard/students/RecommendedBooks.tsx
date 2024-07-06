import bookCoverImg from "@/assets/images/book-cover.png";
import BookCard from "./BookCard";


export default function RecommendedBooks() {
  const books = Array(9)
    .fill(null)
    .map(() => ({
      image: bookCoverImg,
      title: "A Children Book Ab...",
      author: "Joy Berry",
    }));

  return (
    <div className="border rounded-[16px] w-full p-6 mt-5 mb-10">
      <h3 className="text-3xl mb-4">Recommended Books</h3>
      <div className="grid grid-cols-4 gap-6">
        {books.map((book, index) => (
          <BookCard key={index} {...book} />
        ))}
      </div>
    </div>
  );
}
