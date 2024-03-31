/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from 'react';

import { AuthContext } from '../Providers/AuthProvider';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const Login = () => {


    const emailRef = useRef(null);
    const auth = getAuth();
    const { signIn, user, logOut } = useContext(AuthContext);


    const handleLogOut = () => {
        logOut()
            .then((result) => {
                console.log(result.data)
            })
            .catch(error => console.log(error));

    }


    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            console.log('Please provide an email');
            return;
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            console.log('Please enter a valid email');
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Please check your email');
            })
            .catch(error => {
                console.log('Error sending password reset email:', error);
            });
    };



    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        // const captcha= form.captcha.value;
        console.log(email, password)

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset();
            })
    }


    return (
        <div>
            <div className="hero min-h-screen bg-base-200">


                <div className="card shrink-0 w-full max-w-sm 
                    shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <p>Login Check without useforms</p>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email"
                                ref={emailRef} placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" onClick={handleForgetPassword} className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>


                        <div className="form-control mt-6">
                            {
                                user ? <>

                                    <button onClick={handleLogOut} className='btn btn-primary'>Logout</button>

                                </> : <>
                                    <button className='btn btn-primary'><Link to='/login'>Login</Link></button>

                                </>
                            }
                        </div>
                    </form>
                    <Link to='/registration'>Registration

                    </Link>
                </div>
            </div>
        </div>


    );
};

export default Login;