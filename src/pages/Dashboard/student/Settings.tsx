import { useState } from "react";
import { FormInput } from "../../../components/Common/Input";

export default function Settings() {


  return (
    <div className="mt-7 quicksand">
      <div className="border rounded-lg w-full p-6 sm:w-1/2">
        <h3 className="text-2xl font-[600] ">Change Password</h3>
        <div className="mt-4 ">
          <div className="mb-4">
            <FormInput
              label="Current Password"
              type="password"
              placeholder="Password"
              className="mb-0"
            />
            <div className="flex items-center justify-end">
              <button>Forgot Password?</button>
            </div>
          </div>
          <div>
            <FormInput
              label="New Password"
              type="password"
              placeholder="Password"
              className="mb-4"
            />
          </div>
          <div>
            <FormInput
              label="Confirm Password"
              type="password"
              placeholder="Confirm new password"
            />

          </div>
        </div>
      </div>
    </div>
  );
}
