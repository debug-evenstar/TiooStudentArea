import React, { FC } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { HashLoader } from "react-spinners";

interface Props {
  size: number;
  color: string;
}
export const HashSpinner: FC<Props> = ({ size, color }) => {
  return (
    <HashLoader
      color={color}
      size={size}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export const ThreeCirclesLoading = ({
  size,
  color,
}: {
  size: string;
  color: string;
}) => {
  return (
    <ThreeCircles
      height={size}
      width={size}
      color={color}
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="three-circles-rotating"
      outerCircleColor=""
      innerCircleColor=""
      middleCircleColor=""
    />
  );
};
