/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaGithub, FaGofore } from 'react-icons/fa';
import { AuthContext } from '../Providers/AuthProvider';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import Swal from 'sweetalert2';

const Login = () => {


    const emailRef = useRef(null);
    const auth = getAuth();
    const { signIn, user, logOut, googleSignIn } = useContext(AuthContext);


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
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Please provide an email",
                showConfirmButton: false,
                timer: 1500
            });
            return;
            
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Please provide an email",
                showConfirmButton: false,
                timer: 1500
            });
            return;
            
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Please check your email",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => {
                console.log('Error sending password reset email:', error);
                
            });
    };

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

                if (result.user.emailVerified) {
                    console.log('User logged in successfully .....');
                } else {
                    alert('Please verify your email address');
                    
                }

                form.reset();
            })
    }


    return (
        <div className=''>
            <div className="hero min-h-screen ">

                <div className='flex bg-[#ebdcc3]  items-center justify-between w-[1200px] mx-auto h-[900px] rounded-lg  shadow-zinc-600  shadow-2xl'>
                    <div className='w-1/2 h-[500px] border mx-auto'>
                        <img className='w-full border h-full' src="https://i.ibb.co/R78sQMr/authentication2.png" alt="" />
                    </div>

               


                    <div className="card shrink-0 w-1/2 mx-auto h-[600px] max-w-sm 
                    shadow-2xl ">
                        <form onSubmit={handleLogin} className="card-body bg-[#dbd2c2]">
                        <p className='font-bold text-2xl text-center'>Login Form</p>
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
                                user?.emailVerified ? <>

                                    <button onClick={handleLogOut} className='btn btn-primary'>Logout</button>

                                </> : <>
                                    <button className='btn btn-primary'><Link to='/login'>Login</Link></button>

                                </>
                            }
                        </div>
                        <div>
                            <span>New here? Create a New Account </span> <Link className='font-bold' to='/registration'>Register
                            </Link>
                           
                        </div>

                       

                        <div>
                            <h1 className='text-center font-bold text-sm text-gray-600'>or Login with</h1>


                            <div className='flex justify-center gap-5 mt-5 items-center '>
                                <button
                                    onClick={handleGoogle}
                                    type="button"
                                    className=" h-[50px] w-[50px]"
                                >
                                    <img className=' w-[50px]'  src="https://i.ibb.co/YyDRLpV/gogle-removebg-preview.png" alt="" />
                                    {/* <FaGofore className='text-red-800'></FaGofore>  */}
                                </button>

                                <button className=' h-[70px] w-[70px]'

                                  
                                >
                                    <img className='h-full w-full' src="https://i.ibb.co/0Jv7Gx3/Git-Hub-removebg-preview.png" alt="" />
                                </button>
                            </div>


                        </div>


                      
                    </form>



                </div>
                </div>
            </div>
        </div>


    );
};

export default Login;