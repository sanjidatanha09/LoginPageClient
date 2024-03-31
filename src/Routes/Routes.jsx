/* eslint-disable no-unused-vars */
import React from 'react';
import {
    createBrowserRouter,

} from "react-router-dom";
import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import Main from '../Layout/Main';
import Home from '../Home/Home';



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
            {
                path: '/registration',
                element: <Registration></Registration>
            },
        ]
    }


]);