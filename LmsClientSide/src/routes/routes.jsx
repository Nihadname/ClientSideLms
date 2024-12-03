import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ClientLayout from '../layout/Client/ClientLayout/Index';
import Home from '../pages/Client/Home';
import Login from '../pages/Client/Login/Index';
import Profile from '../pages/Client/Profile/Index';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<Home />} />
        <Route path="/Login"  index element={<Login />} />
        <Route path="/Profile"  index element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
