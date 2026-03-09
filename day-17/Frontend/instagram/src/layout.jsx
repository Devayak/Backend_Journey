import React from 'react'
import HomePage from './Features/HomePage'
import {Outlet} from 'react-router'

const layout = () => {
  return (
    <div>
        <HomePage/>
        <Outlet/>
    </div>
  )
}

export default layout