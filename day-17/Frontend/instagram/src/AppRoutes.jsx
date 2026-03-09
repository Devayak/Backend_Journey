// import {createBrowserRouter} from "react-router"
// import Login from "./Features/Auth/Pages/Login"
// import Register from "./Features/Auth/Pages/Register"

// export const router= createBrowserRouter([

//     {
//         path:'/login',
//         element:<Login/>
//     },
//     {
//         path:'register',
//         element:<Register/>
//     }

// ])

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from "react-router";
import Login from "./Features/Auth/Pages/Login";
import Register from "./Features/Auth/Pages/Register";
import Home from "./Features/Auth/Pages/Home";
import HomePage from "./Features/HomePage";

export const AppRoutes=()=>{
    const routes=createBrowserRouter(
        createRoutesFromElements(
           <Route >
             <Route path="/login" element={<Login/>}/>,
            <Route path="/register" element={<Register/>}/>
            <Route path="/homepage" element={<HomePage/>}/>
           </Route>
        )

    )
    return(
       <RouterProvider router={routes}/>
    )
}
