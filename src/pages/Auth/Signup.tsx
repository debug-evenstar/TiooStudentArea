import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import TextInput, { InputType } from "../../components/Ui/TextInput";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import "react-phone-number-input/style.css";
import Button from "../../components/Ui/Button";
import { HashSpinner } from "../../components/Ui/Loading";

const SignupScreen = () => {
  const [isBusy, setIsBusy] = useState()
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      class: "",
      phone: "",
    },
  });
  return (
    <>
      <AuthLayout type="register">
        <div>
          <div className="text-center lg:w-9/12 mx-auto pb-3 border-b-[4px] border-[#4F46E5]">
            <p className="text-primary text-2xl fw-600">Student sign Up</p>
            <p className="mt-1 fw-500">
              Create ana account to get started on 
              <Link to={"/"} className="text-primary">
                SabiKid
              </Link>
            </p>
          </div>
          <div className="lg:px-12 mt-7">
            <form>
              <div>
                <Controller
                  name="name"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Please enter your name",
                    },
                  }}
                  render={({ field }) => (
                    <TextInput
                      label="Full Name"
                      labelClassName="text-[#4A5568] mb-2 fw-500"
                      placeholder="Enter your full name"
                      error={errors.name?.message}
                      type={InputType.text}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="mt-5">
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Please enter your email",
                    },
                  }}
                  render={({ field }) => (
                    <TextInput
                      label="Email"
                      labelClassName="text-[#4A5568] mb-2 fw-500"
                      placeholder="Enter your email address"
                      error={errors.email?.message}
                      type={InputType.email}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="mt-5">
                <Controller
                  name="class"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Please enter your class",
                    },
                  }}
                  render={({ field }) => (
                    <TextInput
                      label="Class"
                      labelClassName="text-[#4A5568] mb-2 fw-500"
                      placeholder="Primary 1"
                      error={errors.name?.message}
                      type={InputType.text}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="mt-5">
                <label className="text-[#4A5568] mb-2 fw-500">
                  Phone Number
                </label>
                <PhoneInputWithCountry
                  international
                  defaultCountry="NG"
                  name="phone"
                  control={control}
                  rules={{ required: true }}
                  className="lg:p-2 p-2 border-2 border-[#DA70D65E] rounded outline-none mt-1"
                />
                {errors.phone && (
                  <p className="error text-red-500 fw-500">
                    Invalid Phone Number
                  </p>
                )}
              </div>
              <div className="mt-5 grid lg:grid-cols-2 gap-5">
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                    minLength: {
                      value: 6,
                      message: "Password is too short",
                    },
                  }}
                  render={({ field }) => (
                    <TextInput
                      label="Password"
                      labelClassName="text-[#4A5568] mb-2 fw-500"
                      placeholder="*********"
                      error={errors.password?.message}
                      type={InputType.password}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                    minLength: {
                      value: 6,
                      message: "Password is too short",
                    },
                  }}
                  render={({ field }) => (
                    <TextInput
                      label="Confirm Password"
                      labelClassName="text-[#4A5568] mb-2 fw-500"
                      placeholder="*********"
                      error={errors.password?.message}
                      type={InputType.password}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="mt-8">
                <div className="w-10/12 mx-auto">
                <Button title={isBusy ? <HashSpinner size={14} color="white"/> : "Sign Up"} disabled={!isValid} />
                </div>
                {/* <Link
                  to="/home"
                  className="btn-like block text-center w-10/12 mx-auto lg:py-4"
                >
                  Sign Up
                </Link> */}
              </div>
            </form>
            <div className="text-center mt-4">
              Already have an account?{" "}
              <Link to="/" className="text-primary fw-500">
                Login
              </Link>
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  );
};

export default SignupScreen;
