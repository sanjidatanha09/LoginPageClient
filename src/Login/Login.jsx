/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';





const Login = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const { createUser } = useContext(AuthContext);

    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser)
            })
    }

  

    return (
        <>

            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">

                   
                    <div className="card shrink-0 w-full max-w-sm 
                    shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <p>Login here</p>

                           

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type='email' {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                                {errors.email && <span className='text-red-600'>This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", {
                                    required: true,
                                    maxLength: 20,
                                    minLength: 6,
                                    pattern: /([^A-Za-z].{6})(?=.*[!@#$%&*^])/

                                })}
                                    placeholder="password" className="input input-bordered" />
                                {errors.password?.type === 'required' && <span>This field is required</span>}

                                {errors.password?.type === 'minLength' && <span>password must be 6 character</span>}

                                {errors.password?.type === 'maxLength' && <span>password less than 20 character</span>}

                                {errors.password?.type === 'pattern' && <span>one lower case, one number ,one upper case and special character</span>}


                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>


                            <div className="form-control mt-6">
                                <input className='btn btn-primary' type="submit" value='Login' />

                            </div>
                        </form>

                        <Link to='/registration'>Registration

                        </Link>
                    </div>
                </div>
            
        </>
    );
};

export default Login;