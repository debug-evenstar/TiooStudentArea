import React from "react";

interface AuthLayoutProps {
  children?: React.ReactNode;
  type?: string
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, type }) => {
  return (
    <div className={`h-[100vh] fixed lg:grid place-content-center overflow-y-scroll w-full bg-[#E3E2FF] ${type === "register" && 'pb-16'}`}>
      <div className="fixed">
        <h3 className="font-semibold text-[22px] pt-4 lg:pt-10 lg:mx-12 mx-2">
          Company's Logo
        </h3>
      </div>
      <div className="w-full lg:min-w-[650px] bg-white min-h-[450px] relative round-box z-30 mt-24 lg:mt-0">
        <div className="max-w-[717px] min-h-[450px] shades w-full bg-white round-box absolute z-20 p-8">
          {children}
        </div>
        <div className={`hidden lg:block max-w-[717px] min-h-[450px] rotates shades w-full bg-white  round-box absolute z-10 ${type === "register"? 'h-[750px]' : type === "complete"? "h-[650px]" : ''}`}></div>
      </div>
    </div>
  );
};

export default AuthLayout;