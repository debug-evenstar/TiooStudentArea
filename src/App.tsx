import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginScreen from './pages/Auth/Login';
import ForgetPasswordScreen from './pages/Auth/ForgetPass';
import DashboardHomePage from './pages/Dashboard/Home';
import ResetPasswordScreen from './pages/Auth/ResetPass';
import SignupScreen from './pages/Auth/Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* auth routes */}
        <Route path='/' element={<LoginScreen/>}/>
        <Route path='/register' element={<SignupScreen/>}/>
        <Route path='/forget' element={<ForgetPasswordScreen/>}/>
        <Route path='/reset' element={<ResetPasswordScreen/>}/>
        {/* dasboard routes */}
        <Route path='/home' element={<DashboardHomePage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
