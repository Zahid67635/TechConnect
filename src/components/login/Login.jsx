/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaUser, FaKey } from "react-icons/fa";

const Login = () => {
    return (
        <div className='w-80 h-96 flex flex-col justify-center bg-slate-300 rounded-xl relative'>
            <div className='w-20 h-20 rounded-full bg-slate-100 absolute top-[-35px] right-[120px]'>
                <Image src='/profile.jpg' alt='' width={80} height={80} className='rounded-full' />
            </div>
            <div className='flex flex-col justify-center py-10 px-4 w-80 h-96'>
                <h1 className='text-3xl font-bold text-slate-700 text-center mb-5'>Login</h1>

                <div className='w-full relative'>
                    <FaUser className='absolute top-[13px] left-2 opacity-50' />
                    <input type="text" placeholder='Your Email' className='mb-5 rounded-2xl py-2 pl-7 w-full' />
                </div>

                <div className='w-full relative'>
                    <FaKey className='absolute top-[13px] left-2 opacity-50' />
                    <input type="text" placeholder='Your Password' className='rounded-2xl py-2 pl-7 w-full' />
                    <a href="" className='flex justify-end underline mt-1'>Forget password</a>
                </div>
                <button className='outline outline-1 outline-black rounded-2xl transition duration-300 hover:bg-indigo-400 hover:outline-none text-semibold p-1 mt-5 w-full'>SignIn</button>

                <p className='text-center'>Don't Have an Account? <Link href='/signup' className='text-blue-700 font-semibold'>SignUp</Link></p>
            </div>
        </div>
    );
};

export default Login;