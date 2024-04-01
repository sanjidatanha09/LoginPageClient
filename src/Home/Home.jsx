/* eslint-disable no-unused-vars */
import React from 'react';
import Login from '../Login/LoginCheck2';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (

        <>

            <Helmet>
                <title>Home</title>
            </Helmet>
       
        <div className='min-h-screen text-center'>

            <Link to='/login'>
                <button className="btn btn-warning mt-52 w-[200px] mx-auto font-bold text-xl">Please Login</button>
            </Link>
            
        </div>

        </>
    );
};

export default Home;