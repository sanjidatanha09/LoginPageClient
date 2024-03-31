/* eslint-disable no-unused-vars */
import React, { useContext, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const emailRef = useRef(null);
    const auth = getAuth();
    const { signIn } = useContext(AuthContext);

    const onSubmit = async (data) => {
        const { email, password } = data;
        try {
            const result = await signIn(email, password);
            const user = result.user;
            console.log(user);

            if (result.user.emailVerified) {
                console.log('User logged in successfully');
            } else {
                alert('Please verify your email address');
            }
        } catch (error) {
            console.error('Error signing in:', error);
        }
    };

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

    return (
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <p>Login here</p>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type='email'
                                {...register("email", { required: true })} // Ensure proper registration
                                ref={emailRef}
                                placeholder="email"
                                className="input input-bordered"
                            />
                            {errors.email && <span className='text-red-600'>This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                {...register("password", {
                                    required: true,
                                    maxLength: 20,
                                    minLength: 6,
                                    pattern: /([^A-Za-z].{6})(?=.*[!@#$%&*^])/
                                })}
                                placeholder="password"
                                className="input input-bordered"
                            />
                            {errors.password?.type === 'required' && <span>This field is required</span>}
                            {errors.password?.type === 'minLength' && <span>Password must be 6 characters</span>}
                            {errors.password?.type === 'maxLength' && <span>Password less than 20 characters</span>}
                            {errors.password?.type === 'pattern' && <span>Must contain one lowercase letter, one number, one uppercase letter, and one special character</span>}
                            <label className="label">
                                <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className='btn btn-primary' type="submit" value='Login' />
                        </div>
                    </form>
                    <Link to='/registration'>Registration</Link>
                </div>
            </div>
        </>
    );
};

export default Login;
