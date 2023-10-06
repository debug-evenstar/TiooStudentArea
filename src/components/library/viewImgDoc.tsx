import React, { FC, useState } from "react";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
interface Props {
  data: any;
}
const ViewImgDoc: FC<Props> = ({ data }) => {
  const banner: string[] = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXCZ3ybFDWM3BONavxok4XLmoB4W1JVDXv-cSx2EaGf1iAgoLLEanKBUK5gHBiYux6lUU&usqp=CAU",
    "https://res.cloudinary.com/dic7regoe/image/upload/v1696359495/praxeum/COVER_PAGE_1_2_1_yz4i2f.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-2oI9NUcfoaqN3aYxvTdYdAtmjVkYtmPLGRGbfJ8ScUpdkptsGAFyK_TZxe1B04wPCnY&usqp=CAU",
    "https://res.cloudinary.com/dic7regoe/image/upload/v1696359495/praxeum/COVER_PAGE_1_2_1_yz4i2f.png",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8&w=1000&q=80",
  ];
  const [preview, setPreview] = useState(true);
  const [showSlides, setShowSlides] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [currentsImage, setCurrentsImage] = useState(1);
  const handleNext = () => {
    if (preview) {
      setPreview(false);
      setShowSlides(true);
      return;
    }
    setCurrentImage((currentImage + 1) % banner.length);
    setCurrentsImage((currentsImage + 1) % banner.length);
  };
  const handlePrevious = () => {
    setCurrentImage((currentImage - 1 + banner.length) % banner.length);
    setCurrentsImage((currentsImage - 1 + banner.length) % banner.length);
  };
  return (
    <>
      <div>
        {preview && (
          <div className="flex justify-center">
            <img
              src="https://res.cloudinary.com/dic7regoe/image/upload/v1696359495/praxeum/COVER_PAGE_1_2_1_yz4i2f.png"
              alt="cover"
              className="lg:w-[350px] xl:w-[400px]"
            />
          </div>
        )}
        {showSlides && (
          <div className="flex gap-x-10 justify-center">
            <img src={banner[currentImage]} alt={`Image ${currentImage + 1}`} className="lg:w-[300px] lg:h-[500px] xl:w-[350px]"/>
            <img src={banner[currentsImage]} alt={`Image ${currentImage + 1}`} className="lg:w-[300px] lg:h-[500px] xl:w-[350px]"/>
          </div>
        )}
        <div>
          <FaGreaterThan
            className="absolute cursor-pointer text-white top-[50%] right-10 text-5xl"
            onClick={handleNext}
          />
          <FaLessThan
            className="absolute cursor-pointer text-white top-[50%] left-10 text-5xl"
            onClick={handlePrevious}
          />
        </div>
        <div className="flex justify-end">
            <img src='https://res.cloudinary.com/dic7regoe/image/upload/v1696583822/praxeum/Group_12638_laxj5x.png' alt="hello" className="w-36"/>
        </div>
      </div>
    </>
  );
};

export default ViewImgDoc;
