import { MdImage } from "react-icons/md";
import bookImg from "@/assets/icons/book-icon.svg";
import { dashboardApiSlice } from "../../../services/api/dashboardSlice";
import { toast } from "react-toastify";
import { TfiTrash } from "react-icons/tfi";

export interface BookCardProps {
  cover_photo: string;
  name: string;
  author: string;
  id: number;
  type?: string;
}

const BookCard = ({
  type,
  cover_photo,
  name,
  id,
  author = "No author",
}: any) => {
  const [addToShelf] = dashboardApiSlice.useAddToStudentShelfMutation();
  const [removeFromShelf] = dashboardApiSlice.useRemoveFromStudentShelfMutation();

  const handleClick: any = async () => {
    const response =
      type == "shelf"
        ? await removeFromShelf({ textbook_id: id })
        : await addToShelf({ textbook_id: id });

    toast.success(response?.data?.message);
  };

  return (
    <div className="w-full h-full">
      <div
        className={`h-[17rem] border border-light overflow-hidden flex items-center justify-center mb-2 ${
          cover_photo ? "" : "bg-gray-50"
        }`}
      >
        {cover_photo ? (
          <img src={cover_photo} alt="" className="w-full" />
        ) : (
          <div className="flex flex-col">
            <p>
              <MdImage color="#ddd" size={90} />
            </p>
            <p className="text-gray-500 text-center">No cover</p>
          </div>
        )}
      </div>
      <div className="py-3 quicksand  ">
        <p className="font-[600] text-xl">{name}</p>
        <p>By {author}</p>
      </div>
      {type != "shelf" ? (
        <button
          onClick={handleClick}
          className="px-3 py-2 active:ring quicksand font-[600] flex space-x-2 rounded-full border border-primary text-primary "
        >
          <img src={bookImg} alt="" />
          <span>Add to shelf</span>
        </button>
      ) : (
        <button
          onClick={handleClick}
          className="px-3 py-2 active:ring quicksand font-[600] flex items-center space-x-2 rounded-full border border-red-500 text-red-500"
        >
          <TfiTrash />
          <span>Remove</span>
        </button>
      )}
    </div>
  );
};

export default BookCard;
