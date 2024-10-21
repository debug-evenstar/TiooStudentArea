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
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import { truncateString } from "../../../utils/format";

export interface BookCardProps {
  cover_photo: string;
  name: string;
  author: string;
  is_premium: boolean;
  id: number;
  type?: string;
  removeModalHandler: Function;
  inShelf?: boolean;
}

const BookCard: FC<BookCardProps> = ({
  removeModalHandler,
  type,
  cover_photo,
  name,
  id,
  inShelf,
  author,
  is_premium,
}) => {
  const navigate = useNavigate();
  const [addToShelf] = dashboardApiSlice.useAddToStudentShelfMutation();
  const [loading, setLoading] = useState(false);

  const handleOpenLesson = useCallback(() => {
    navigate(`/book/study-area/${id}`);
  }, [navigate, id]);

  const handleClick = useCallback(async () => {
    if (type === "shelf") {
      // setShowDelete(true);
    } else if (inShelf) {
      handleOpenLesson();
    } else {
      setLoading(true);
      const response = await addToShelf({ textbook_id: id });
      setLoading(false);
      toast.success(response?.data?.message);
    }
  }, [type, inShelf, id, addToShelf, handleOpenLesson]);
  
  const isShelf = type === "shelf";
  return (
    <div title={name} className="w-full border h-full bg-white duration-1000 hover: hover:scale-[1.05] ease-in-out border-gray-300 overflow-hidden px-3 py-2 relative rounded-2xl hover:shadow-[rgba(0,0,0,0.2)_0px_0px_45px_0px] group">
      <div className="absolute z-[40] inset-0 bg-gray-800/50 ease-in-out duration-1000 transition opacity-0 hover:opacity-100 flex items-center jusity-center">
        <button
          onClick={isShelf ? handleOpenLesson : handleClick}
          className={`px-3 py-2 h-fit active:ring bg-white text-gray-900 quicksand font-[600] w-[80%] mx-auto justify-center flex gap-x-2 items-center rounded-full border border-white ${
            inShelf ? "" : ""
          }`}
        >
          {!isShelf ? (
            !loading ? (
              <>
                {inShelf ? <FiExternalLink /> : <img className="w-5 sm:w-auto" src={bookImg} alt="" />}
                <span className="text-[14px]">{inShelf ? "Open" : "Add to shelf"}</span>
              </>
            ) : (
              <PulseLoader size={7} className="py-2" color="#323232" />
            )
          ) : (
            <>
              <FiExternalLink />
              <span>Open</span>
            </>
          )}
        </button>
      </div>

      {type === "shelf" ? (
        <Menu placement="bottom-start">
          <MenuHandler>
            <button className="absolute z-[40] w-[30px] h-[30px] justify-center  rounded-full text-transparent flex group-hover:bg-white group-hover:shadow-[rgba(0,0,0,0.15)_0px_0px_25px_0px] group-hover:text-dark bg-transparent items-center font-normal text-black capitalize">
              <BsThreeDots className="text-xl" />
            </button>
          </MenuHandler>
          {/* @ts-ignore */}
          <MenuList>
            {/* @ts-ignore */}
            <MenuItem
              title="Remove from shelf"
              onClick={() => removeModalHandler(id)}
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

      <div
        className={`overflow-hidden rounded-lg flex h-[14rem] sm:h-[17rem] justify-center mb-2 ${
          cover_photo ? "" : "bg-gray-50"
        }`}
      >
        {cover_photo ? (
          <img src={cover_photo} alt="" className="mb-1 shadow-lg  mx-auto" />
        ) : (
          <div className="flex flex-col h-[15rem] items-center justify-center">
            <MdImage color="#ddd" size={90} />
            <p className="text-gray-500 text-center">No cover</p>
          </div>
        )}
      </div>

      <div className="mb quicksand">
        <p className="font-[600] text-lg text-nowrap" title={name}>
          {truncateString(name, 20)}
        </p>
        <p className="text-sm">By {author || "Tioo"}</p>
      </div>
    </div>
  );
};

export default BookCard;
