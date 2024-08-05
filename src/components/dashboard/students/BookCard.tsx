import { MdImage } from "react-icons/md";
import bookImg from "@/assets/icons/book-icon.svg";
import { dashboardApiSlice } from "../../../services/api/dashboardSlice";
import { toast } from "react-toastify";
import { TfiTrash } from "react-icons/tfi";

import { FiExternalLink } from "react-icons/fi";
import { FC, MouseEventHandler, useState } from "react";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { BsThreeDots } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";
import { LuCrown } from "react-icons/lu";

export interface BookCardProps {
  cover_photo: string;
  name: string;
  author: string;
  id: number;
  type?: string;
  inShelf?: boolean;
}

interface DeleteModalProps {
  title?: string;
  content?: string;
  onCancel: MouseEventHandler<HTMLButtonElement>;
  onDelete: MouseEventHandler<HTMLButtonElement>;
}

const DeleteModal: FC<DeleteModalProps> = ({ title, content, onCancel, onDelete }) => {
  return (
    <div className="bg-[#00000022] inset-0 fixed w-full h-screen z-[200] flex justify-center ">
      <div className="w-full shadow sm:-[18rem] lg:w-[23rem] bg-white p-8 py-6 rounded-lg mt-20 h-fit">
        <div className="text-lg py-2 font-[600] text-gray-800 ">
          <p>
            {title}
          </p>
        </div>
        <div className="text-gray-700 py-2 mb-3">
          <p>{content} </p>
        </div>
        <div className="flex items-center justify-end space-x-3">
          <button onClick={onCancel} className="text-gray-600 px-4 shadow py-2 rounded">Cancel</button>
          <button onClick={onDelete} className="text-white px-4 shadow bg-red-600 py-2 rounded">Delete</button>
        </div>
      </div>
    </div>
  );
}

const BookCard = ({
  type,
  cover_photo,
  name,
  id,
  inShelf,
  author = "No author",
  BookCategory,
}: any) => {


  const navigate = useNavigate();

  const [addToShelf] = dashboardApiSlice.useAddToStudentShelfMutation();
  const [removeFromShelf] = dashboardApiSlice.useRemoveFromStudentShelfMutation();

  const openLesson = () => {
    navigate("/dashboard/books/" + id + "/study")
  };

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const deleteFromShelf = async () => {
    await removeFromShelf({ textbook_id: id })
    setShowDelete(false);
  }


  const handleClick: any = async () => {
    setDeleteLoading(true);
    const response =
      type == "shelf"
        ? setShowDelete(true)
        : await addToShelf({ textbook_id: id });
    setDeleteLoading(false);
    toast.success(response?.data?.message);
  };

  return (
    <div className="w-full h-full group relative">
      {
        showDelete &&
        <DeleteModal
          title="Delete Book"
          content="Are you sure you want to delete this book?"
          onCancel={() => setShowDelete(false)}
          onDelete={deleteFromShelf}
        />
      }


      {type == "shelf" ?

        <Menu placement="bottom-end">
          <MenuHandler>
            <button className="absolute px-3 py-1 text-transparent flex group-hover:bg-[#ffffffaa] group-hover:text-dark right-0 bg-transparent mx-0 hover:shadow-none text-md items-center font-normal shadow-none text-black capitalize">
              <BsThreeDots className="text-xl" />
            </button>
          </MenuHandler>
          <MenuList>
            <MenuItem
              id={"1"}
              title="Remove from shelf"
              onClick={() => setShowDelete(true)}
              className="flex gap-x-2 items-center"
            >
              <RiDeleteBin5Line />
              <span>Remove</span>
            </MenuItem>
          </MenuList>
        </Menu>

        :
        (
          BookCategory && BookCategory.category == "Premium" &&
          <div className="absolute px-3 py-1 rounded-r-lg mt-2  bg-primary">
            <LuCrown color="gold" />
          </div>
        )
      }
      <div
        className={`h-[17rem]  border border-gray-200 overflow-hidden flex items-center justify-center mb-2 ${cover_photo ? "" : "bg-gray-50"
          }`}
      >
        {cover_photo ? (
          <img src={cover_photo} alt="" className="w-full h-full" />
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
          className={`px-3 py-2 active:ring quicksand font-[600] flex space-x-2 rounded-full border ${inShelf
            ? "text-gray-500 border-gray-400"
            : "border-primary text-primary"
            }`}
        >
          <img src={bookImg} alt="" />
          <span>{inShelf ? "Added" : "Add to shelf"}</span>
        </button>
      ) : (
        <div className="flex items-center justify-between">
          <button
            onClick={openLesson}
            className="px-3 py-2  w-full active:ring justify-center quicksand font-[600] flex items-center space-x-2 border-primary text-primary rounded-full border "
          >
            <FiExternalLink />
            <span>Open</span>
          </button>
          {/* <button
            onClick={handleClick}
            className="flex items-center p-2 rounded border space-x-2 text-sm text-red-500"
          >
            {deleteLoading ? (
              <PulseLoader size={4} color="#616161" />
            ) : (
              <TfiTrash />
            )}
          </button> */}
        </div>
      )}
    </div>
  );
};

export default BookCard;
