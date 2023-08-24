import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    const navs = [
        {
            id: 1,
            address: 'Home',
            url: '/'
        },
        {
            id: 2,
            address: 'About',
            url: '/about'
        },
        {
            id: 3,
            address: 'Contact',
            url: '/contact'
        },
        {
            id: 4,
            address: 'Details',
            url: '/details'
        },
    ]
    return (
        <div className='p-4 mb-5 bg-teal-100'>
            <div className='flex justify-between list-none items-center'>
                <h2 className='font-bold text-2xl text-indigo-500'>TechConnect</h2>
                <div className='flex'>
                    {
                        navs.map(nav => <li key={nav.id} className='mx-1 p-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:bg-indigo-500 hover:text-white rounded-lg font-semibold'><Link href={nav.url} >{nav.address}</Link></li>)
                    }
                    <div className='ml-5 flex items-center'>
                        <Link href='/login' className='p-2 bg-indigo-500 text-white font-semibold rounded-lg'>SignIn</Link>
                        <Link href='/signup' className='p-2 text-black font-semibold rounded-lg ml-2 hover:bg-slate-300'>SignUp</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;