import React, { useState, useEffect } from "react";

const BannerAnnouncement = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const bannerShown = localStorage.getItem("bannerShown");
    if (!bannerShown) {
      setTimeout(() => {
        setShowBanner(true);
        setTimeout(() => {
          setIsVisible(true);
        }, 100);
      }, 1000);
    }
  }, []);

  const handleCloseBanner = () => {
    setIsVisible(false);
    setTimeout(() => {
      setShowBanner(false);
      localStorage.setItem("bannerShown", "true");
    }, 300);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 w-full text-gray-800 p-4 flex backdrop-blur h-full z-[1000] justify-center items-center 
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}
        transition-all duration-300 ease-in-out`}
    >
      <div className="bg-white shadow-lg rounded-[16px] p-5 w-full lg:w-[40rem]">
        <div className="flex flex-col gap-5">
          <div className="p-6 text-gray-800">
            <p className="font-bold text-xl">
              Welcome to Tioo! We're thrilled to have you on board!
            </p>

            <p className="mt-4">
              Currently, we offer comprehensive{" "}
              <span className="font-semibold">Math</span> and{" "}
              <span className="font-semibold">Physics</span> tutorials, with:
            </p>

            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>
                <span className="font-semibold">Chemistry</span> launching on
                November 11th
              </li>
              <li>
                Past Questions and Answers for the above subjects will launch in
                December along with our{" "}
                <span className="font-semibold">CBT/mock exam practice</span>.
              </li>
              <li>
                <span className="font-semibold">
                  Biology, Use of English, and other Commercial
                </span>{" "}
                and <span className="font-semibold">Art</span> subjects will follow
                in January next year.
              </li>
            </ul>

            <p className="mt-4">Join our WhatsApp study group for:</p>

            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>
                <span className="font-semibold">Exclusive updates</span> on new
                subjects
              </li>
              <li>
                <span className="font-semibold">Early access</span> to upcoming
                features
              </li>
              <li>
                <span className="font-semibold">Community support</span> from fellow
                students and our team
              </li>
            </ul>

            <p className="italic mt-4">Learn smart, Learn with experience</p>
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <button
            onClick={handleCloseBanner}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerAnnouncement;
