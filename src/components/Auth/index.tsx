import { MouseEvent, ReactNode, useRef, useState } from "react";

import openEye from "@/assets/icons/open-eye.svg";

export const SocialButton = ({ name, image, handler = () => null }: any) => {
  return (
    <button
      onClick={handler}
      type="button"
      className="lg:w-fit mb-3 w-full flex items-center border rounded"
    >
      <img src={image} alt="" className="w-10 p-2 h-10 rounded border-r" />
      <span className="text-sm mx-auto font-[500] inline-block w-[8rem] text-center">
        {name}
      </span>
    </button>
  );
};

export const CheckboxInput = ({ name, active, setActive }: any) => {
  const ref = useRef<any>();
  

  const handleInputClick = (e: MouseEvent<HTMLInputElement>) => {};

  const handleClick = () => {
    setActive(!active);
    if (ref.current) {
      ref.current.value = !active ? "On" : "Off";
      ref.current.click();
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={`border border-gray-400 outline-none h-6 w-6 rounded ${
          ref.current && ref.current.value == "On" && "bg-main border-white"
        }`}
      >
        {ref.current && ref.current.value == "On" && (
          <div className="w-2 h-2 flex items-center text-lg justify-center text-white rounded-full mx-auto">✔</div>
        )}
      </button>
      <input
        ref={ref}
        name={name}
        onClick={handleInputClick}
        type="checkbox"
        className="hidden"
      />
    </>
  );
};

export const Input = ({
  type = "text",
  placeholder,
  handleChange,
  name,
  errorMessage,
  label,
  className,
}: any) => {
  return (
    <div className={`w-full ${className}`}>
      <label className="" htmlFor={name}>
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          onChange={handleChange}
          name={name}
          className="outline-none focus:border-main mt-2 w-full px-3 py-2 border border-gray-300 rounded"
        />
        {type == "password" && (
          <button className="right-3 absolute top-4 ">
            <img alt="" className="w-5" src={openEye} />
          </button>
        )}
      </div>
      <p className="text-red-500 h-4 text-sm">{errorMessage}</p>
    </div>
  );
};

export const AuthHeader = ({ children }: { children: ReactNode }) => {
  return <h3 className="font-[600] text-3xl mb-10 text-center">{children}</h3>;
};
