import React, {FC} from "react";
import { HashLoader } from "react-spinners";

interface Props{
    size: number
    color: string
}
export const HashSpinner:FC<Props> = ({ size, color }) => {
  return (
    <HashLoader
      color={color}
      size={size}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};