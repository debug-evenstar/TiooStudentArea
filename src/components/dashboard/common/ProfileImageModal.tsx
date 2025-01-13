import React, { useEffect, useRef, useState } from "react";
import { ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";
import { FaPen } from "react-icons/fa6";
import profilePic from "@/assets/images/profile-pic.png";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader, ScaleLoader } from "react-spinners";
import { saveUser, selectUser } from "../../../redux/reducers/userReducer";
import { userApiSlice } from "../../../services/api/userSlice";

const ProfileImageModal = ({
  isOpen,
  onClose,
  next,
}: {
  isOpen: boolean;
  onClose: () => void;
  next: any;
}) => {
  const { user } = useSelector(selectUser);
  const imageRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [updateUser, { isLoading: saveLoading }] =
    userApiSlice.useUpdateUserProfileMutation();
  const { data, isLoading, refetch } =
    userApiSlice.useGetUserInformationQuery();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(
    data?.data?.display_image || profilePic
  );

  useEffect(() => {
    setImagePreview(data?.data?.display_image || profilePic);
  }, [data]);

  useEffect(() => {
    if (!data) return;
    const [firstName, lastName] = data?.data?.name?.split(" ") || ["", ""];
    setFormData({
      first_name: firstName,
      last_name: lastName,
    });
  }, [data]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData();
    // formdata.append("name", `${formData.first_name} ${formData.last_name}`);

    if (selectedImage) {
      formdata.append("file", selectedImage);
    }

    try {
      const response = await updateUser(formdata);
      if (!response.error) {
        dispatch(
          saveUser({ ...user, display_image: response?.data?.display_image })
        );
        refetch();
        toast.success("Photo updated successfully!");
        next();
        onClose();
      }
      setSelectedImage(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");
    }
  };

  const handleImageClick = () => {
    imageRef?.current?.click();
  };

  return (
    <div
      className={`inset-0 fixed flex items-center h-fullw-full justify-center bg-gray-300/40 ${
        isOpen ? "flex" : "hidden"
      }`}
    >
      <div className="bg-white w-full lg:w-1/2 lg:rounded-[24px] p-5 ">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">Update Your Photo</h3>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        {isLoading ? (
          <div className="px-3 inset-0 relative h-full w-full flex items-center justify-center">
            <ScaleLoader height={26} color="#9c29b2" />
          </div>
        ) : (
          <div className="py-10">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Profile Preview"
                    className="w-[90px] bg-gray-100 h-[90px] rounded-full border object-cover"
                  />
                  <button
                    onClick={handleImageClick}
                    type="button"
                    className="absolute border border-primary -right-2 bottom-2 bg-gray-200 active:ring ring-primary px-2 rounded-full text-sm flex gap-3 items-center py-2"
                  >
                    <FaPen size={10} />
                  </button>
                </div>
                <input
                  ref={imageRef}
                  type="file"
                  name="image"
                  hidden
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </div>
              <div className="flex gap-6">
              <button
                  type="submit"
                  className="px-4 py-2 bg-primary rounded text-white font-bold"
                >
                  {saveLoading ? (
                    <PulseLoader size={12} color="white" />
                  ) : (
                    <span>Save</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => { next(); onClose() ;}}
                  className="px-4 py-2 bg-primary rounded text-white font-bold"
                >
                 
                    <span>Next</span>
                  
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileImageModal;
