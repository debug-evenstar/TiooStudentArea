import React from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link } from 'react-router-dom'
import { Controller, useForm } from "react-hook-form";
import TextInput, { InputType } from '../../components/Ui/TextInput';

const ForgetPasswordScreen = () => {
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
  return (
    <>
      <AuthLayout>
        <div>
          <div className='text-center w-7/12 mx-auto pb-3 border-b-[4px] border-[#4F46E5]'>
            <p className='text-primary text-2xl fw-600'>Forgot Password</p>
          </div>
          <div className='mt-6 lg:px-12 text-center'>
            <p>Enter the Email associated with your account and we’ll send an email with instructions to reset your password</p>
          </div>
          <div className='lg:px-12 mt-6'>
            <form>
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

export default ForgetPasswordScreen