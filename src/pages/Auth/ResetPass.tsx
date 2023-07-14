import React from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link } from 'react-router-dom'
import { Controller, useForm } from "react-hook-form";
import TextInput, { InputType } from '../../components/Ui/TextInput';

const ResetPasswordScreen = () => {
  const {
    control,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      password: "",
      password2: "",
    },
  });
  return (
    <>
      <AuthLayout>
        <div>
        <div className='text-center w-7/12 mx-auto pb-3 border-b-[4px] border-[#4F46E5]'>
            <p className='text-primary text-2xl fw-600'>Create New Password</p>
            <p className='mt-1 fw-500'>Enter new password</p>
          </div>
          <div className='lg:px-12 mt-6'>
            <form>
            <div>
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
                label="New Password"
                labelClassName="text-[#4A5568] mb-2 fw-500"
                placeholder="*********"
                error={errors.password?.message}
                type={InputType.password}
                {...field}
              />
            )}
          />
        </div>
        <div>
            <Controller
            name="password2"
            control={control}
            rules={{
                required: {
                  value: true,
                  message: "Re-enter your password",
                },
                validate: (val) => {
                  if (watch('password') !== val) {
                    return "Your passwords do no match";
                  }
                },
              }}
            render={({ field }) => (
              <TextInput
                label="Confirm new password"
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
          {/* <Button title={isBusy ? <ScaleSpinner size={14} color="white"/> : "Continue"} disabled={!isValid} /> */}
          <Link to='/dashboard' className="btn-like block text-center w-10/12 mx-auto lg:py-4">Continue</Link>
        </div>
            </form>
            <div className='text-center mt-4'>
            Switch back to? <Link to='/' className='text-primary fw-500'>Login</Link>
            </div>
          </div>
        </div>
      </AuthLayout>
    </>
  )
}

export default ResetPasswordScreen