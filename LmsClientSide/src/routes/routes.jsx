import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ClientLayout from '../layout/Client/ClientLayout/Index';
import Home from '../pages/Client/Home';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
