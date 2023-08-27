/* eslint-disable react/no-unescaped-entities */
"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaUser, FaKey, FaAt } from "react-icons/fa";

const SignUpForm = () => {
    const [userImg, setUserImg] = useState('')
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setUserImg(imageUrl);
        }
        else {
            setUserImg('')
        }
    };
    return (
        <div className='w-96 flex flex-col justify-center rounded-xl relative bg-transparent border border-white'>
            <div className='w-20 h-20 rounded-full bg-slate-100 absolute top-[-35px] right-[150px] border-cyan-500'>
                <Image src={`${userImg ? userImg : '/profile.jpg'}`} alt='' fill={true} className='rounded-full' />
            </div>
            <div className='flex flex-col justify-center py-12 px-4 w-full'>
                <h1 className='text-3xl font-bold text-center mb-5 text-slate-200'>SignUp</h1>
                <div className='w-full relative'>
                    <FaUser className='absolute top-[13px] left-2 opacity-50' />
                    <input type="text" placeholder='Your full Name' className='mb-5 rounded-2xl py-2 pl-8 w-full focus:outline-cyan-500' />
                </div>
                <div className='w-full relative'>
                    <FaAt className='absolute top-[13px] left-2 opacity-50' />
                    <input type="text" placeholder='Your Email' className='mb-5 rounded-2xl py-2 pl-8 w-full focus:outline-cyan-500' />
                </div>

                <div className='w-full relative'>
                    <FaKey className='absolute top-[13px] left-2 opacity-50' />
                    <input type="password" placeholder='Your Password' className='mb-5 rounded-2xl py-2 pl-8 w-full focus:outline-cyan-500' />
                </div>
                <div className='w-full relative'>
                    <FaKey className='absolute top-[13px] left-2 opacity-50' />
                    <input type="password" placeholder='Confirm Password' className='mb-5 rounded-2xl py-2 pl-8 w-full focus:outline-cyan-500' />
                </div>
                <div className='w-2/3 relative text-slate-200'>
                    <span>Upload Your Image - </span>
                    <input type="file" placeholder='Confirm Password' id='userImage' onChange={handleImageUpload} className='mb-5 rounded-2xl py-2 w-full mt-1' />
                </div>
                <button className='outline outline-1 outline-white rounded-2xl transition duration-300 hover:bg-indigo-500 hover:outline-none text-semibold p-1 py-2 mt-4 w-full text-slate-200 font-semibold'>SignUp</button>
                <p className='text-center text-slate-200'>Already Have an Account?<Link href='/login' className='font-semibold '> Login</Link></p>
            </div>
        </div>
    );
};

export default SignUpForm;