import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export const FormInput = ({
  type = "text",
  placeholder,
  handleChange,
  name,
  errorMessage,
  label,
  value,
  className,
}: any) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={`w-full ${className}`}>
      <label className="text-sm" htmlFor={name}>
        {label}
      </label>
      <div className="relative">
        <input
          type={type == "password" ? (!visible ? "password" : "text") : type}
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
          name={name}
          className="outline-none focus:border-main mt-2 w-full text-sm px-3 py-2.5 border border-gray-300 rounded"
        />
        {type == "password" && (
          <button
            type="button"
            onClick={() => setVisible(!visible)}
            tabIndex={-1}
            className="right-3 absolute top-5 "
          >
            {!visible ? (
              <FiEye size={16} color="#313131" />
            ) : (
              <FiEyeOff size={16} color="#313131" />
            )}
          </button>
        )}
      </div>
      { errorMessage && <p className="text-red-500 h-4 text-sm">{errorMessage}</p> }
    </div>
  );
};
