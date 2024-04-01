/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaGithub, FaGofore  ,FaRegEyeSlash, FaEye } from 'react-icons/fa';
import { AuthContext } from '../Providers/AuthProvider';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const Login = () => {

    const [showpassword, setShowpassword] = useState(false);
    const emailRef = useRef(null);
    const auth = getAuth();
    const { signIn, user, logOut, googleSignIn } = useContext(AuthContext);


  

    const handleLogOut = () => {
        logOut()
            .then(() => {})
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
            Swal.fire({
                title: "Good job!",
                text: "user login successfully",
                icon: "success"
            });
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
                    Swal.fire({

                        text: "user logged in successfully",
                        icon: "success"
                    });
                } else {
                    Swal.fire({
                        
                        text: "Please verify your email address",
                        icon: "success"
                    });
                    
                    
                }

                form.reset();
            })
    }


    return (
        <>

            <Helmet>
                <title>Login</title>
            </Helmet>

            <div className="hero min-h-screen ">

                <div className='flex flex-col lg:flex-row bg-[#f0e6d5]  items-center justify-center md:w-[700px] lg:w-[1000px] mx-auto md:h-[1200px] lg:h-[700px] mt-5 lg:mt-0  rounded-lg  shadow-zinc-600  shadow-2xl '>
                    <div className='mt-5 lg:mt-0 w-full lg:w-[60%] lg:h-[500px]  mx-auto '>
                        <img className='h-full w-full' src="https://i.ibb.co/R78sQMr/authentication2.png" alt="" />
                    </div>

               


                    <div className="w-[80%]  mx-auto lg:w-[40%] h-[540px] md:h-[750px] mb-6 lg:mb-0 lg:h-[600px]  
                    shadow-2xl rounded-2xl lg:mr-20">

                        {/* form start */}
                        <form onSubmit={handleLogin} className="card-body bg-[#f0e6d5] rounded-2xl  lg:w-full h-[500px]  lg:h-[600px]  ">
                            <p className='font-extrabold text-xl md:text-4xl lg:text-2xl text-center mb-5 lg:mb-0'>Login Form</p>

                        {/* Email here */}

                        <div className="form-control ">
                            <label className="label">
                                <span className="label-text text-lg md:text-2xl lg:text-xl font-bold">Email Address</span>
                            </label>
                            <input type="email" name="email"
                                ref={emailRef} placeholder="email" className="input input-bordered" required />
                        </div>

                        {/* password here */}

                        <div className="form-control  relative">
                         
                                    <label className="label">
                                    <span className="label-text  text-lg md:text-2xl lg:text-xl font-bold">Password</span>
                                    </label>
                                    <input type={showpassword ? "text" : "password"} name='password' placeholder="password" className="input input-bordered" required />

                                    {/*bottom-4 lg:bottom-[14px] right-4 absolute  */}


                                    <span className='bottom-4 lg:bottom-[14px] right-4 absolute ' onClick={() => setShowpassword(!showpassword)}>
                                        {
                                            showpassword ? <FaRegEyeSlash></FaRegEyeSlash> : <FaEye></FaEye>
                                        }

                                    </span>

                          </div>

                                {/* forgot password here */}
                            <label className="label">
                                <a href="#" onClick={handleForgetPassword} className="label-text-alt link link-hover font-bold">Forgot password?</a>
                            </label>
                    


                        <div className="form-control mt-3 md:mt-6">
                            {
                                user?.emailVerified ? <>

                                        <button onClick={handleLogOut} className='btn btn-warning font-bold md:font-extrabold text-lg md:text-xl uppercase'>Logout</button>

                                </> : <>
                                            <button className='btn btn-warning font-bold md:font-extrabold  uppercase text-lg md:text-xl'><Link to='/login'>Login</Link></button>

                                </>
                            }
                        </div>
                            <div className='w-[282px] md:w-[340px] lg:w-[282px] mx-auto md:mt-5'>
                            <span className='text-sm md:text-base lg:text-sm w-full '>New here? Create a New Account </span> <Link className='font-bold md:text-xl lg:text-lg' to='/registration'>Register
                            </Link>
                           
                        </div>

                       

                        <div>
                            <h1 className='text-center font-bold md:text-2xl lg:text-xl pt-2 md:pt-4'>or Login with</h1>


                            <div className='flex justify-center gap-1  items-center '>
                                <button
                                    onClick={handleGoogle}
                                    type="button"
                                    className=" lg:h-[50px] lg:w-[50px] ml-2 md:ml-6 lg:ml-4"
                                >
                                    <img className='w-[50px] md:w-[80px] lg:w-[50px]'  src="https://i.ibb.co/YyDRLpV/gogle-removebg-preview.png" alt="" />
                                    {/* <FaGofore className='text-red-800'></FaGofore>  */}
                                </button>

                                    <button className='h-[70px] md:h-[115px] lg:h-[70px] w-[70px] md:w-[115px] lg:w-[70px]'

                                  
                                >
                                    <img className='h-full w-full' src="https://i.ibb.co/0Jv7Gx3/Git-Hub-removebg-preview.png" alt="" />
                                </button>
                            </div>


                        </div>


                      
                    </form>



                </div>
                </div>
            </div>
        </>


    );
};

export default Login;