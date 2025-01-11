import React, { useEffect, useRef, useState } from "react";
import { ChangeEvent, FormEvent } from "react";
import { FormInput } from "../../../../components/Common/Input";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPen } from "react-icons/fa6";
import profilePic from "@/assets/images/profile-pic.png";
import { useDispatch, useSelector } from "react-redux";
import { saveUser, selectUser } from "../../../../redux/reducers/userReducer";
import { userApiSlice } from "../../../../services/api/userSlice";
import { PulseLoader, ScaleLoader } from "react-spinners";

export default function ProfileSettings() {
  const { user } = useSelector(selectUser);
  const navigate = useNavigate();
  const imageRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [updateUser, { isLoading: saveLoading }] =
    userApiSlice.useUpdateUserProfileMutation();

  const { data, isLoading,refetch } = userApiSlice.useGetUserInformationQuery();

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
    if (!user) return;
    const [firstName, lastName] = user?.name?.split(" ");
    setFormData({
      first_name: firstName,
      last_name: lastName,
    });
  }, [user]);

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
      setImagePreview(URL.createObjectURL(file)); // Create preview URL
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("first_name", formData.first_name);
    formdata.append("last_name", formData.last_name);
    if (selectedImage) {
      formdata.append("file", selectedImage); // Append the selected file
    }

    try {
      const response = await updateUser(formdata);
      if(!response.error){
        dispatch(
          saveUser({ ...user, display_image: response?.data?.display_image})
        )
        refetch();
        toast.success("Profile updated successfully!");
      }
      setSelectedImage(null);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile.");
    }
  };

  const handleImageClick = () => {
    imageRef?.current?.click();
  };

  if (isLoading) {
    return (
      <div className="px-3 inset-0 relative h-full w-full flex items-center justify-center">
        <ScaleLoader height={26} color="#9c29b2" />
      </div>
    );
  }

  return (
    <div className="mt-7 quicksand">
      <button
        onClick={() => navigate(-1)}
        className="mb-5 outfit-font flex items-center gap-3"
      >
        <FaArrowLeft />
        <span>back</span>
      </button>
      <h3 className="text-2xl font-[600] mb-4">Update Profile</h3>
      <div className="border rounded-lg w-full bg-white p-6 sm:w-1/2">
        <form onSubmit={handleSubmit} className="mt-4 ">
          <div className="mb-4 flex items-center gap-1">
            <img
              src={imagePreview}
              alt="Profile Preview"
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
            <button
              onClick={handleImageClick}
              type="button"
              className="bg-gray-200 active:ring ring-primary px-2 rounded-full text-sm flex gap-3 items-center py-2"
            >
              <FaPen size={10} />
            </button>
            <input
              ref={imageRef}
              type="file"
              name="image"
              hidden
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>
          <div className="mb-4">
            <FormInput
              handleChange={handleOnChange}
              label="First name"
              type="text"
              name="first_name"
              value={formData.first_name}
              placeholder="First name"
              className="mb-0"
            />
          </div>
          <div>
            <FormInput
              handleChange={handleOnChange}
              label="Last name"
              type="text"
              name="last_name"
              value={formData.last_name}
              placeholder="Last name"
              className="mb-4"
            />
          </div>
          <div className="flex items-center justify-end mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-primary rounded w-full sm:w-fit text-white font-[600]"
            >
              {saveLoading ? (
                <PulseLoader size={12} color="white" />
              ) : (
                <span>Submit</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
