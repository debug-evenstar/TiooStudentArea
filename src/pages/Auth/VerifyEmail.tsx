import React from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import TextInput, { InputType } from "../../components/Ui/TextInput";
import OTPInput from "react-otp-input";

const VerifyEmailScreen = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      otp: "",
    },
  });
  return (
    <>
      <AuthLayout>
        <div>
          <div className="text-center w-7/12 mx-auto pb-3 border-b-[4px] border-[#4F46E5]">
            <p className="text-primary text-2xl fw-600">Verify your Account</p>
          </div>
          <div className="mt-6 lg:w-8/12 mx-auto text-center">
            <p>
              Enter the 6 digit code sent to johnathanethan53@gmail.com to
              verify your account.
            </p>
          </div>
          <div className="lg:px-12 my-8">
            <form>
              <div>
                <Controller
                  name="otp"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Please enter your email",
                    },
                  }}
                  render={({ field }) => (
                    <OTPInput
                      numInputs={6}
                      renderSeparator={<span> </span>}
                      renderInput={(props) => <input {...props} />}
                      inputStyle="border !w-2/12 h-12 bg-[#EDEDED] rounded-[4px]"
                      containerStyle="flex justify-between lg:gap-x-4"
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="mt-8">
                {/* <div className="w-10/12 mx-auto">
                  <Button
                    title={
                      isBusy ? (
                        <HashSpinner size={14} color="white" />
                      ) : (
                        "Sign Up"
                      )
                    }
                    disabled={!isValid}
                  />
                </div> */}
                <Link
                  to="/dashboard"
                  className="btn-like block text-center w-10/12 mx-auto lg:py-4"
                >
                  Continue
                </Link>
              </div>
            </form>
            <div className="text-center mt-4">
                <p>Not able to verify account?</p>
              <p><span className="text-primary fw-500 underline">Resend code</span> or 
              <Link to="/" className="text-primary fw-500 underline pl-2">
                Update Email
              </Link></p>
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  );
};

export default VerifyEmailScreen;
