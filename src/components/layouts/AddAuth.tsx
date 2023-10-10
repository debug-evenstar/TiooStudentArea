import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthCheck from "../../hooks/useAuthCheck";

const AddAuth = (Component: any) => {
  const Wrapper = (props: any) => {
    const navigate = useNavigate();
    const { IsAuthenticated } = useAuthCheck();

    const gotoLogin = () => {
        window.location.replace("https://hellotioo.com");
    }
    const checkAuth = () => {
      if (!IsAuthenticated) {
        gotoLogin()
        return null;
      }
    }
   useEffect(() => {
    checkAuth()// eslint-disable-next-line 
   }, [])

    return <Component {...props} />;
  };

  Wrapper.displayName = `AddAuth(${
    Component.displayName || Component.name || "Component"
  })`;

  return Wrapper;
};

export default AddAuth;