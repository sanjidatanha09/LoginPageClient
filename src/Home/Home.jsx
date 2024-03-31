/* eslint-disable no-unused-vars */
import React from 'react';
import Login from '../Login/LoginCheck2';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>

            <Link to='/login'>
                <button className="btn btn-primary mt-32 w-[200px] mx-auto ">Please Login</button>
            </Link>
            
        </div>
    );
};

export default Home;