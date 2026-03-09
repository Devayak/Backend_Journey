import React from 'react'
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router'
import Login from '../Features/Auth/Pages/Login'
import Register from '../Features/Auth/Pages/Register'
import Layout from './Layout'
import Feed from '../Features/Post/page/Feed'
import Nav from '../Features/Shared/Component/Nav'
import CreatePost from '../Features/Post/page/CreatePost'

const AppRoutes = () => {
  const routes=createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout/>}>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/createpost' element={<CreatePost/>}/>
        <Route path='/' element={<Feed/>}/>
      </Route>
    )
  )
  return (
    <RouterProvider router={routes}/>
  )
}

export default AppRoutes