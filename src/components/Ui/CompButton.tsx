import React from "react";
// import { classNames } from "../../utils/format";


interface Props {
  title: string | JSX.Element;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  capitalizeTitle?: boolean;
  secondary?: boolean;
  disabled?: boolean;
  className?: string;
  altClassName?: string;
  isBusy?: boolean;
  prev?: boolean
}

const CompButton: React.FC<Props> = ({
  title,
  onClick,
  capitalizeTitle,
  disabled,
  altClassName,
  isBusy,
  prev
}) => {
  return (
    <div className={disabled? "opacity-75 " : ""}>
      <div className={prev? "polywrapper2" : "polywrapper"}>
      <button className={`text-center py-6 text-xl w-[120px] fw-600 cursor-pointer ${prev? "bg-[#E3E2FF] pl-2 poly-2" : "poly pr-2 text-white bg-[#86A94B]"}`} onClick={onClick ? onClick : undefined} disabled={disabled}>
      {isBusy ? (
          "loading"
        ) : capitalizeTitle ? (
          title
        ) : (
          title
        )}
      </button>
      </div>
    </div>
  );
};

export default CompButton;