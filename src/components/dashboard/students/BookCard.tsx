import { MdImage } from "react-icons/md";
import bookImg from "@/assets/icons/book-icon.svg";
import { dashboardApiSlice } from "../../../services/api/dashboardSlice";
import { toast } from "react-toastify";

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

  const handleClick: any = () => {
    addToShelf({
      textbook_id: id,
    }).then((response) => {
      toast.success(response.data.message);
      // console.log(response.data);
    });
  };

  return (
    <div className="w-full h-full">
      <div className="h-[17rem] overflow-hidden flex items-center justify-center mb-2 bg-gray-100">
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
      <div className="py-3">
        <p className="text-lg font-[500]">{name}</p>
        <p>By {author}</p>
      </div>
      {type != "shelf" ? (
        <button
          onClick={handleClick}
          className="px-3 py-2 flex space-x-2 rounded-full border-2 border-primary text-primary "
        >
          <img src={bookImg} alt="" />  

          <span>Add to shelf</span>
        </button>
      ) : (
        <button className="px-3 py-2 flex space-x-2 rounded-full border-2 border-red-500 text-red-500 ">
          Remove
        </button>
      )}
    </div>
  );
};

export default BookCard;
