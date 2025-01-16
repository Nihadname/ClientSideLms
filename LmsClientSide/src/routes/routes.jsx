import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ClientLayout from '../layout/Client/ClientLayout/Index';
import Home from '../pages/Client/Home';
import Login from '../pages/Client/Login/Index';
import Profile from '../pages/Client/Profile/Index';
import NotesPage from '../pages/Note/Index';
import PaymentPage from '../pages/Payment/PaymentPage';
import ChangePassword from '../pages/ChangePassword';
// import CheckoutForm from '../pages/Client/CheckOut/Index'; // Commented out for now

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<Home />} />
        <Route path="/Login" index element={<Login />} />
        <Route path="/Profile" index element={<Profile />} />
        <Route path="/NotesPage" index element={<NotesPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
