import React, { useState, useEffect } from "react";

const BannerAnnouncement = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // State to manage visibility

  useEffect(() => {
    const bannerShown = localStorage.getItem("bannerShown");
    if (bannerShown) {
      setTimeout(() => {
        setShowBanner(true);
        setTimeout(() => {
          setIsVisible(true); // Show the banner with animation
        }, 100); // Delay to ensure the transition is smooth
      }, 1000);
    }
  }, []);

  const handleCloseBanner = () => {
    setIsVisible(false); // First, start hiding animation
    setTimeout(() => {
      setShowBanner(false); // After animation ends, remove from DOM
      localStorage.setItem("bannerShown", "true");
    }, 300); // Timeout should match the CSS transition duration
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div
      className={`fixed w-full text-gray-800 p-4 flex backdrop-blur h-full z-[1000] justify-center items-center 
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}
        transition-all duration-300 ease-in-out`}
    >
      <div className="bg-white shadow-lg rounded-[16px] p-5 w-full lg:w-[40rem]">
        <div className="flex flex-col gap-5">
          <b>Get Ready for Launch</b>
          <p>
            We are excited to announce that Tioo will officially launch on{" "}
            <b>October 21st, 2024</b> with Math as our first subject! You'll get
            a <b>7-day free trial</b> to explore the platform before choosing a
            plan
          </p>
          <p>
            By the end of November, we'll roll out <b> all other subjects</b>,
            complete with tutorials and past lessons. In the meantime, whether
            you're focusing on Math or waiting for more subjects, we invite you
            to <b>join our WhatsApp group</b> to stay updated, ask questions,
            and connect with others.
          </p>
          <p>
            <b>Stay tuned for an amazing learning experience</b>
          </p>
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
