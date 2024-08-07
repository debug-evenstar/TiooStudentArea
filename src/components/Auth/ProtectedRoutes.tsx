import React, { useEffect } from 'react'
import { logoutUser } from '../../utils/logout';
import { Outlet } from 'react-router-dom';

export default function ProtectedRoutes() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token == "" || token == null) {
      logoutUser();
    }
  },[]);
  return <Outlet/>;
}
