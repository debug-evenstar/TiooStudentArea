import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import TextInput, { InputType } from "../../components/Ui/TextInput";
import Button from "../../components/Ui/Button";
import { HashSpinner } from "../../components/Ui/Loading";

const CompleteSignupScreen = () => {
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
      school: "",
      class: "",
      age: "",
    },
  });
  return (
    <>
      <AuthLayout type="complete">
        <div>
          <div className="text-center lg:w-9/12 mx-auto pb-3 border-b-[4px] border-[#4F46E5]">
            <p className="text-primary text-2xl fw-600">Complete Sign up</p>
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
                      message: "Please enter child name",
                    },
                  }}
                  render={({ field }) => (
                    <TextInput
                      label="Child&apos;s Name"
                      labelClassName="text-[#4A5568] mb-2 fw-500"
                      placeholder="Enter child&apos;s full name"
                      error={errors.name?.message}
                      type={InputType.text}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="mt-5">
                <Controller
                  name="school"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Please enter your child school",
                    },
                  }}
                  render={({ field }) => (
                    <TextInput
                      label="Child&apos;s School"
                      labelClassName="text-[#4A5568] mb-2 fw-500"
                      placeholder="Enter child&apos;s school"
                      error={errors.school?.message}
                      type={InputType.text}
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
                      message: "Please enter child's class",
                    },
                  }}
                  render={({ field }) => (
                    <TextInput
                      label="Child&apos;s Class"
                      labelClassName="text-[#4A5568] mb-2 fw-500"
                      placeholder="Primary 1"
                      error={errors.class?.message}
                      type={InputType.text}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="mt-5">
                <Controller
                  name="age"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Please enter child's age",
                    },
                  }}
                  render={({ field }) => (
                    <TextInput
                      label="Child&apos;s Age"
                      labelClassName="text-[#4A5568] mb-2 fw-500"
                      error={errors.age?.message}
                      type={InputType.number}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="mt-8">
                <div className="w-10/12 mx-auto">
                <Button title={isBusy ? <HashSpinner size={14} color="white"/> : "Get Started"} disabled={!isValid} />
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

export default CompleteSignupScreen;
