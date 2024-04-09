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

            // this is for home page
            {
                path: '/',
                element: <Home></Home>
            },

            // this is for login page
           
            {
                path: '/login',
                element: <Login></Login>
            },

            // this is for registration page
    
            {
                path: '/registration',
                element: <Registration></Registration>
            },
        ]
    }


]);