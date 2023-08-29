import { RiLock2Line } from "react-icons/ri";
import { SlLockOpen } from "react-icons/sl";

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatName = (string: string, number: number) => {
  if (string.length > number - 2) {
    return string.substring(0, number).concat("...");
  } else return string;
};

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export const formatAsNgnMoney = (value: number | string) => {
  if (!value) return "";
  return `₦${value
    .toLocaleString("en-US")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export const formatLessonColor = (name: string, status: string) => {
  switch (status) {
    case "completed":
      return <p className="text-[#E40FC2] fw-600">{name}</p>;
    case "ongoing":
      return <p className="text-[#E7A70B] fw-600">{name}</p>;
    case "pending":
      return <p className="text-[#86A94B] fw-600">{name}</p>;
    default:
      return name;
  }
};

export const formatLessonStatus = (status: string) => {
  switch (status) {
    case "completed":
      return (
        <p className="bg-[#E40FC2] py-1 px-2 text-white rounded-lg fw-500 fs-200">
          completed
        </p>
      );
    case "ongoing":
      return (
        <p className="bg-[#E7A70B] py-1 px-2 text-white rounded-lg fw-500 fs-300">
          Resume
        </p>
      );
    case "Unlocked":
      return (
        <p className="text-[#86A94B] fw-500 mr-2">
          <SlLockOpen className="text-lg" />
        </p>
      );
    case "unlocked":
        return (
          <p className="text-[#86A94B] fw-500 mr-2">
            <SlLockOpen className="text-lg" />
          </p>
        );
    case "Active":
      return (
        <p className="text-[#86A94B] fw-500 mr-2">
          <SlLockOpen className="text-lg" />
        </p>
      );
    case "active":
      return (
        <p className="text-[#86A94B] fw-500 mr-2">
          <SlLockOpen className="text-lg" />
        </p>
      );
    case "Locked":
      return (
        <p className="text-[#86A94B] fw-500 mr-2">
          <RiLock2Line className="text-lg" />
        </p>
      );
    default:
      return status;
  }
};

export const nthNumber = (number: number) => {
  if (number > 3 && number < 21) return "th";
  switch (number % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};
