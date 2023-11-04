import React, { useEffect } from "react";
import useAuthCheck from "../../hooks/useAuthCheck";

const AddAuth = (Component: any) => {
  const Wrapper = (props: any) => {
    const { IsAuthenticated } = useAuthCheck();

    const gotoLogin = () => {
        window.location.replace(`${import.meta.env.VITE_HOME_KEY}/login`);
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