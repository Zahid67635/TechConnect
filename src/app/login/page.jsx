import Login from '@/components/login/Login';
import Image from 'next/image';
import React from 'react';

const page = () => {
    return (
        <div className='flex justify-center gap-48 mt-20 px-10'>
            <div className='md:flex justify-center h-[500px] hidden'>
                <Image src='/login5.png' alt='' width={500} height={500}></Image>
            </div>
            <div className='flex justify-center items-center'>
                <Login />
            </div>
        </div>
    );
};

export default page;