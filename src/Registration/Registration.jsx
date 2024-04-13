/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaGithub, FaGofore, FaRegEyeSlash, FaEye } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import { sendEmailVerification } from 'firebase/auth';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Registration = () => {
    const [showpassword, setShowpassword] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { createUser, googleSignIn } = useContext(AuthContext);
    const handleGoogle = () => {
        googleSignIn().then(result => {
            console.log(result.user)
            // toast('user login successfully');
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName
            }
        });
    };
    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser)
                //send verification email
                sendEmailVerification(result.user)
                    .then(() => {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "please check your email and verfiy your account",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        reset();
                    })
            })
            .catch(error => {
                console.error(error)
                toast(error.message);
            })
    }

    return (
        <>
            <Helmet>
                <title>Registration</title>
            </Helmet>
            <div className="hero min-h-screen">
                <div className="flex flex-col lg:flex-row-reverse md:w-[700px] lg:w-[1100px] md:h-[1200px] lg:h-[780px] mt-5 lg:mt-0 bg-[#f0e6d5] items-center justify-center mx-auto  rounded-lg shadow-zinc-600 shadow-2xl gap-0 ">
                    <div className=' w-full lg:w-[60%] h-[380px] md:h-[600px] mx-auto'>
                        <img className='h-full w-full border' src="https://i.ibb.co/R78sQMr/authentication2.png" alt="" />
                    </div>
                    <div className="w-[80%] lg:w-[40%] mx-auto md:h-[820px] lg:h-[640px] 
                    shadow-2xl rounded-2xl lg:ml-20 mb-6 lg:mb-0">
                        {/* form start here */}
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body bg-[#f0e6d5] rounded-2xl w-full  h-[600px] ">
                            <p className='font-extrabold md:font-bold text-xl md:text-2xl text-center uppercase mb-2'>Please Register here</p>
                            {/* name start here */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base md:text-2xl lg:text-xl font-extrabold md:font-bold">Full Name</span>
                                </label>
                                <input  {...register("name", { required: true })} name="name" placeholder="name" className="input input-bordered" />
                                {errors.name && <span>This field is required</span>}
                            </div>
                            {/*Email start here */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base md:text-2xl lg:text-xl font-extrabold md:font-bold">Email Address</span>
                                </label>
                                <input type='email' {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                                {errors.email && <span className='text-red-600'>This field is required</span>}
                            </div>
                            {/* password start here */}
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text text-base md:text-2xl lg:text-xl font-extrabold md:font-bold">Password</span>
                                </label>
                                <input type={showpassword ? "text" : "password"} {...register("password", {
                                    required: true,
                                    maxLength: 20,
                                    minLength: 6,
                                    pattern: /([^A-Za-z].{6})(?=.*[!@#$%&*^])/

                                })}
                                    placeholder="password" className="input input-bordered" />
                                <span className='bottom-4 lg:bottom-[14px] right-4 absolute ' onClick={() => setShowpassword(!showpassword)}>
                                    {
                                        showpassword ? <FaRegEyeSlash></FaRegEyeSlash> : <FaEye></FaEye>
                                    }
                                </span>
                                {errors.password?.type === 'required' && <span>This field is required</span>}
                                {errors.password?.type === 'minLength' && <span>password must be 6 character</span>}
                                {errors.password?.type === 'maxLength' && <span>password less than 20 character</span>}
                                {errors.password?.type === 'pattern' && <span>one lower case, one number ,one upper case and special character</span>}
                            </div>
                            <div className="form-control mt-6">
                                <input className='btn btn-warning text-xl font-bold md:text-2xl uppercase' type="submit" value='Register' />
                            </div>
                            <div className=' mt-5 text-center'>
                                <span className='text-sm md:text-lg lg:text-sm w-full'>Already Registered? Go to </span> 
                                <Link className='font-bold md:text-xl lg:text-lg' to='/login'>Login</Link>
                            </div>
                            <div>
                                <h1 className='text-center font-bold md:text-2xl lg:text-xl pt-2 md:pt-4'>or SignUp with</h1>
                                <div className='flex justify-center gap-1  items-center ml-3  md:ml-6 lg:ml-4'>
                                    <button onClick={handleGoogle} type="button">
                                        <img className='w-[50px] md:w-[80px] lg:w-[50px]' src="https://i.ibb.co/YyDRLpV/gogle-removebg-preview.png" alt="" />
                                    </button>
                                    <button className='h-[70px] md:h-[115px] lg:h-[70px] w-[70px] md:w-[115px] lg:w-[70px]'>
                                        <img className='h-full w-full' src="https://i.ibb.co/0Jv7Gx3/Git-Hub-removebg-preview.png" alt="" />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <ToastContainer />
                <ToastContainer />
            </div>
        </>
    );
};

export default Registration;