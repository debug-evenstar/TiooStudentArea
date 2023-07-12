import React from "react";

interface AuthLayoutProps {
  children?: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="h-[100vh] fixed overflow-y-scroll pb-[80px] w-full bg-[#E3E2FF]">
      <div className="w-full flex items-start justify-start">
        <h3 className="font-semibold text-[22px] pt-10 mx-12">
          Company's Logo
        </h3>
      </div>

      <div className="w-full flex items-center justify-center py-[60px] relative">
        <div className="max-w-[717px] w-full px-[60px] pt-[46px] pb-[56px] bg-white shadow-lg rounded-tl-[8px] rounded-tr-[8px] rounded-bl-[8px] absolute top-[60px] z-30 border border-[#4F46E5]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;