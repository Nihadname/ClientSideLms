import React from 'react'
import HeaderClient from '../Header/Index'
import { Outlet } from 'react-router-dom'
import FooterClient from '../Footer/Index'

const ClientLayout = () => {
  return (
    <div>
      <HeaderClient/>
      <Outlet/>
      <FooterClient/>
    </div>
  )
}

export default ClientLayout
