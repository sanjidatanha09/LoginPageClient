/* eslint-disable no-unused-vars */
import React from 'react';
import { Outlet } from 'react-router-dom';
import Login from '../Login/Login';

const Main = () => {
    return (
        <div>
            

            <Outlet></Outlet>
            <Login></Login>

        </div>
    );
};

export default Main;