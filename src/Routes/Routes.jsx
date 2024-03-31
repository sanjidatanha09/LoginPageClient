/* eslint-disable no-unused-vars */
import React from 'react';
import {
    createBrowserRouter,

} from "react-router-dom";
import Registration from '../Registration/Registration';
import Main from '../Layout/Main';
import Home from '../Home/Home';
import Login from '../Login/Login';





export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
           
            {
                path: '/login',
                element: <Login></Login>
            },
            // {
            //     path: '/login',
            //     element: <LoginCheck></LoginCheck>
            // },
            {
                path: '/registration',
                element: <Registration></Registration>
            },
        ]
    }


]);