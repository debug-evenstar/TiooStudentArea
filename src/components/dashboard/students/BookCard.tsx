import { MdImage } from "react-icons/md";
import bookImg from "@/assets/icons/book-icon.svg";
import { dashboardApiSlice } from "../../../services/api/dashboardSlice";
import { toast } from "react-toastify";
import { FiExternalLink } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";
import { LuCrown } from "react-icons/lu";
import { FC, useState, useCallback, MouseEventHandler } from "react";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { Menu, MenuHandler, MenuList, MenuItem, Button } from "@material-tailwind/react";
import { truncateString } from "../../../utils/format";

export interface BookCardProps {
  cover_photo: string;
  name: string;
  author: string;
  is_premium: boolean;
  id: number;
  type?: string;
  inShelf?: boolean;
}

interface RemoveFromShelfModalProps {
  title?: string;
  content?: string;
  onCancel: MouseEventHandler<HTMLButtonElement>;
  onDelete: MouseEventHandler<HTMLButtonElement>;
}

const RemoveFromShelfModal: FC<RemoveFromShelfModalProps> = ({ title, content, onCancel, onDelete }) => (
  <div className="bg-[#00000022] inset-0 fixed w-full h-screen z-[200] flex justify-center ">
    <div className="w-full shadow sm:-[18rem] lg:w-[23rem] bg-white p-8 py-6 rounded-lg mt-20 h-fit">
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

const BookCard: FC<BookCardProps> = ({ type, cover_photo, name, id, inShelf, author = "--", is_premium }) => {
  const navigate = useNavigate();
  const [addToShelf] = dashboardApiSlice.useAddToStudentShelfMutation();
  const [removeFromShelf] = dashboardApiSlice.useRemoveFromStudentShelfMutation();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleOpenLesson = useCallback(() => {
    navigate(`/books/${id}/study`);
  }, [navigate, id]);

  const handleRemoveFromShelf = async () => {
    await removeFromShelf({ textbook_id: id });
    setShowDelete(false);
  };

  const handleClick = useCallback(async () => {
    setDeleteLoading(true);
    if (type === "shelf") {
      setShowDelete(true);
    } else if (inShelf) {
      handleOpenLesson();
    } else {
      const response = await addToShelf({ textbook_id: id });
      toast.success(response?.data?.message);
    }
    setDeleteLoading(false);
  }, [type, inShelf, id, addToShelf, handleOpenLesson]);

  return (
    <div className="w-full h-full group relative">
      {showDelete && (
        <RemoveFromShelfModal
          title="Remove Book"
          content="Are you sure you want to remove this book?"
          onCancel={() => setShowDelete(false)}
          onDelete={handleRemoveFromShelf}
        />
      )}

      {type === "shelf" ? (
        <Menu placement="bottom-end">
          <MenuHandler>
            <button className="absolute px-3 py-1 text-transparent flex group-hover:bg-[#ffffffaa] group-hover:text-dark right-0 bg-transparent hover:shadow-none items-center font-normal text-black capitalize">
              <BsThreeDots className="text-xl" />
            </button>
          </MenuHandler>
          <MenuList
            placeholder="stuff"
            onPointerEnterCapture={() => null}
            onPointerLeaveCapture={() => null}
          >
            <MenuItem
              placeholder="stuff"
              onPointerEnterCapture={() => null}
              onPointerLeaveCapture={() => null}
              title="Remove from shelf"
              onClick={() => setShowDelete(true)}
              className="flex gap-x-2 items-center"
            >
              <RiDeleteBin5Line />
              <span>Remove</span>
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        is_premium && (
          <div className="absolute px-3 py-1 rounded-r-lg mt-2 bg-primary">
            <LuCrown color="gold" />
          </div>
        )
      )}

      <div className={`h-[17rem] border border-gray-200 overflow-hidden rounded-lg flex items-center justify-center mb-2 ${cover_photo ? "" : "bg-gray-50"}`}>
        {cover_photo ? (
          <img src={cover_photo} alt="" className="w-full" />
        ) : (
          <div className="flex flex-col">
            <MdImage color="#ddd" size={90} />
            <p className="text-gray-500 text-center">No cover</p>
          </div>
        )}
      </div>

      <div className="py-3 quicksand">
        <p className="font-[600] text-lg text-nowrap" title={name}>{truncateString(name, 20)}</p>
        <p className="text-sm">By {author}</p>
      </div>

      {type !== "shelf" ? (
        <button
          onClick={handleClick}
          className={`px-3 py-2 active:ring quicksand font-[600] w-full justify-center flex space-x-2 items-center rounded-full border border-primary text-primary ${inShelf ? "" : ""}`}
        >
          {inShelf ? <FiExternalLink /> : <img src={bookImg} alt="" />}
          <span>{inShelf ? "Open" : "Add to shelf"}</span>
        </button>
      ) : (
        <div className="flex items-center justify-between">
          <button
            onClick={handleOpenLesson}
            className="px-3 py-2 w-full active:ring justify-center quicksand font-[600] flex items-center space-x-2 border-primary text-primary rounded-full border"
          >
            <FiExternalLink />
            <span>Open</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default BookCard;
