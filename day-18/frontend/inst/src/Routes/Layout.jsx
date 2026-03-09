import React from 'react'
import{Outlet} from 'react-router'
import { Home } from '../Features/Auth/Pages/Home'

const Layout = () => {
  return (
    <div>
        {/* <Home/> */}
        <Outlet/>
    </div>
  )
}

export default Layout