import React from "react";
import { ChangeEvent, FormEvent, useState } from "react";
import { FormInput } from "../../../../components/Common/Input";
import { useLazyGetLibraryChapterQuery } from "../../../../services/api/librarySlice";
import { authApiSlice } from "../../../../services/api/authSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

export default function PasswordReset() {
  const [resetPasswordRequest] = authApiSlice.useLegacyResetPasswordMutation();
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  const [formData, setFormData] = useState({
    password: "",
    new_password: "",
    password_confirmation: "",
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await resetPasswordRequest(formData);
    if (!response.data.error) {
      return toast.success(response.data.message);
    }
    return toast.error(response.data.message);
  };

  return (
    <div className="mt-7 quicksand">
      <button onClick={handleBack} className="mb-5 outfit-font flex items-center gap-3">
        <FaArrowLeft />
        <span>back</span>
      </button>
      <div className="border rounded-lg w-full bg-white p-6 sm:w-1/2">
        <h3 className="text-2xl font-[600] ">Change Password</h3>
        <form onSubmit={handleSubmit} className="mt-4 ">
          <div className="mb-4">
            <FormInput
              handleChange={handleOnChange}
              label="Current Password"
              type="password"
              name="password"
              value={formData.password}
              placeholder="Password"
              className="mb-0"
            />
            <div className="flex items-center justify-end">
              <Link to={`${import.meta.env.VITE_APP_HOME_URL}/forgot-password`}>
                <button type="button">Forgot Password?</button>
              </Link>
            </div>
          </div>
          <div>
            <FormInput
              handleChange={handleOnChange}
              label="New Password"
              type="password"
              name="new_password"
              value={formData.new_password}
              placeholder="Password"
              className="mb-4"
            />
          </div>
          <div>
            <FormInput
              handleChange={handleOnChange}
              label="Confirm Password"
              name="password_confirmation"
              type="password"
              value={formData.password_confirmation}
              placeholder="Confirm new password"
            />
          </div>
          <div className="flex items-center justify-end mt-4">
            <button className="px-4 py-2 bg-primary rounded w-full sm:w-fit text-white font-[600] ">
              {" "}
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
