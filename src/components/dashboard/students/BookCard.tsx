import { MdImage } from "react-icons/md";
import bookImg from "@/assets/icons/book-icon.svg";
import { dashboardApiSlice } from "../../../services/api/dashboardSlice";
import { toast } from "react-toastify";
import { TfiTrash } from "react-icons/tfi";

import { FiExternalLink } from "react-icons/fi";
import { useState } from "react";
import { PulseLoader } from "react-spinners";

export interface BookCardProps {
  cover_photo: string;
  name: string;
  author: string;
  id: number;
  type?: string;
  inShelf?: boolean;
}

const BookCard = ({
  type,
  cover_photo,
  name,
  id,
  inShelf,
  author = "No author",
}: any) => {
  console.log("book id", id);
  const [addToShelf] = dashboardApiSlice.useAddToStudentShelfMutation();
  const [removeFromShelf] =
    dashboardApiSlice.useRemoveFromStudentShelfMutation();
  const openLesson = () => {
    window.location.href = "/dashboard/books/" + id + "/study";
  };

  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleClick: any = async () => {
    setDeleteLoading(true);
    const response =
      type == "shelf"
        ? await removeFromShelf({ textbook_id: id })
        : await addToShelf({ textbook_id: id });
    setDeleteLoading(false);
    toast.success(response?.data?.message);
  };

  return (
    <div className="w-full h-full">
      <div
        className={`h-[17rem]  border border-gray-200 overflow-hidden flex items-center justify-center mb-2 ${
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
        {/* <p>By {author}</p> */}
      </div>
      {type != "shelf" ? (
        <button
          onClick={handleClick}
          disabled={inShelf}
          className={`px-3 py-2 active:ring quicksand font-[600] flex space-x-2 rounded-full border ${
            inShelf
              ? "text-gray-500 border-gray-400"
              : "border-primary text-primary"
          }`}
        >
          <img src={bookImg} alt="" />
          <span>{inShelf ? "Added to shelf" : "Add to shelf"}</span>
        </button>
      ) : (
        <div className="flex items-center justify-between">
          <button
            onClick={openLesson}
            className="px-3 py-2 active:ring quicksand font-[600] flex items-center space-x-2 border-primary text-primary rounded-full border "
          >
            <FiExternalLink />
            <span>Open</span>
          </button>
          <button
            onClick={handleClick}
            className="flex items-center p-2 rounded border space-x-2 text-sm text-red-500"
          >
            {deleteLoading ? (
              <PulseLoader size={4} color="#616161" />
            ) : (
              <TfiTrash />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default BookCard;
