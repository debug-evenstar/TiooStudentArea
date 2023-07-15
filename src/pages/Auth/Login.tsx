import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import TextInput, { InputType } from "../../components/Ui/TextInput";
import Button from "../../components/Ui/Button";
import { HashSpinner } from "../../components/Ui/Loading";
import { useLazyLoginQuery } from "../../services/api/authSlice";
import { useAppDispatch } from "../../redux/store";
import { saveUser } from "../../redux/reducers/userReducer";
import { storeLocalToken } from "../../services/helpers";
import { toast } from "react-toastify";

const LoginScreen = () => {
  
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [login] = useLazyLoginQuery()
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data:any) => {
    setIsBusy(true);
    await login(data)
      .then((res:any) => {
        if (res.isSuccess) {
          dispatch(
            saveUser({
                token: res.data.token,
                name: res.data.profile.name,
                AccountId: res.data.profile.AccountId,
                account_type: res.data.profile.account_type,
                email: res.data.profile.email,
                phone: res.data.profile.phone,
                schoolName: res.data.profile.schoolName,
                studentClass: res.data.profile.studentClass,
                status: res.data.profile.status,
                term: res.data.profile.term,
                subjectsCount: res.data.profile.subjectsCount,
                flag: res.data.profile.flag,
                verification_status: res.data.profile.verification_status,
          }))
          storeLocalToken("token", res.data.token) 
          toast.success(res.data.message)
          navigate("/home")
        }else {
          toast.error(res.error.data.message);
          setIsBusy(false);
        }
      })
      .catch((err) => {
        toast.error(err?.error?.data?.message);
        setIsBusy(false);
      });
  };
  return (
    <>
      <AuthLayout>
        <div>
          <div className="text-center w-7/12 mx-auto pb-3 border-b-[4px] border-[#4F46E5]">
            <p className="text-primary text-2xl fw-600">Log In</p>
            <p className="mt-1 fw-500">
              Securely Login to your{" "}
              <Link to={"/"} className="text-primary">
                SabiKid
              </Link>{" "}
              account
            </p>
          </div>
          <div className="lg:px-12 mt-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
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
              <div className="mt-6">
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
                <div className="text-end">
                  <Link to="/forget" className="text-[#FF006E]">
                    Forget Password
                  </Link>
                </div>
              </div>
              <div className="mt-8">
                <div className="w-10/12 mx-auto">
                  <Button
                    title={
                      isBusy ? (
                        <HashSpinner size={20} color="white" />
                      ) : (
                        "Sign Up"
                      )
                    }
                    disabled={!isValid}
                  />
                </div>
              </div>
            </form>
            <div className="text-center mt-4">
              Don’t have an account?{" "}
              <Link to="/register" className="text-primary fw-500">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  );
};

export default LoginScreen;
